import React from 'react'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { EventsBlock } from '@/blocks/Events/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
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
  events: EventsBlock,
  faq: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  mediaBlock: MediaBlock,
  slider: SliderBlock,
  team: TeamBlock,
}

export function RenderBlocks({
  blocks,
  headingIdsByBlock,
}: {
  blocks: LayoutBlock[]
  headingIdsByBlock?: Record<number, Record<number, string[]>>
}) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return (
          <div key={i} className="block-section">
            <Component {...block} headingIds={headingIdsByBlock?.[i]} />
          </div>
        )
      })}
    </>
  )
}
