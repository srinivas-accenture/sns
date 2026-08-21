import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<Record<string, unknown>>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return `/${relationTo !== 'pages' ? `${relationTo}/` : ''}${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }: { node: SerializedBlockNode<Record<string, unknown>> }) => (
      <MediaBlock {...(node.fields as Parameters<typeof MediaBlock>[0])} />
    ),
    cta: ({ node }: { node: SerializedBlockNode<Record<string, unknown>> }) => (
      <CallToActionBlock {...(node.fields as Record<string, unknown>)} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  headingIds?: string[]
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, headingIds, ...rest } = props
  let headingIndex = 0
  const converters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...(headingIds
      ? {
          heading: ({ node, nodesToJSX }: any) => {
            const children = nodesToJSX({ nodes: node.children })
            const id = headingIds[headingIndex++]
            const Tag = node.tag
            return <Tag id={id}>{children}</Tag>
          },
        }
      : {}),
  })

  return (
    <ConvertRichText
      converters={(args) => ({ ...jsxConverters(args), ...converters(args) })}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert prose-headings:text-brand-primary':
            enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
