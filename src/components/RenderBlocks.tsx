import React from 'react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SliderBlock } from '@/blocks/Slider/Component'
import { TeamBlock } from '@/blocks/Team/Component'

type LayoutBlock = {
  blockType: string
  [key: string]: unknown
}

const blockComponents: Record<string, React.FC<any>> = {
  cta: CallToActionBlock,
  content: ContentBlock,
  contentWithImage: ContentWithImageBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  slider: SliderBlock,
  team: TeamBlock,
}

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={i} {...block} />
      })}
    </>
  )
}
