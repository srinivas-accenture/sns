import React from 'react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SliderBlock } from '@/blocks/Slider/Component'

type LayoutBlock = {
  blockType: string
  [key: string]: unknown
}

const blockComponents: Record<string, React.FC<any>> = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  slider: SliderBlock,
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
