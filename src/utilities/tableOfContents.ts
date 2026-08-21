export type TableOfContentsItem = {
  id: string
  label: string
  level: 2 | 3 | 4
}

type HeadingNode = {
  type?: string
  tag?: string
  text?: string
  children?: HeadingNode[]
}

type ContentColumn = { richText?: { root?: { children?: HeadingNode[] } } | null }
type LayoutBlock = { blockType?: string; columns?: ContentColumn[] }

function textFromNode(node: HeadingNode): string {
  return [node.text ?? '', ...(node.children ?? []).map(textFromNode)]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getPostTableOfContents(blocks: unknown[]): {
  items: TableOfContentsItem[]
  headingIdsByBlock: Record<number, Record<number, string[]>>
} {
  const items: TableOfContentsItem[] = []
  const headingIdsByBlock: Record<number, Record<number, string[]>> = {}
  const usedIds = new Map<string, number>()

  blocks.forEach((rawBlock, blockIndex) => {
    const block = rawBlock as LayoutBlock
    if (block.blockType !== 'content' || !block.columns?.length) return

    block.columns.forEach((column, columnIndex) => {
      const headings = column.richText?.root?.children ?? []
      headings.forEach((node) => {
        if (!node.tag || !['h2', 'h3', 'h4'].includes(node.tag)) return
        const label = textFromNode(node)
        if (!label) return

        const base = slugify(label) || 'section'
        const count = usedIds.get(base) ?? 0
        usedIds.set(base, count + 1)
        const id = count ? `${base}-${count + 1}` : base
        const level = Number(node.tag.slice(1)) as 2 | 3 | 4
        items.push({ id, label, level })
        headingIdsByBlock[blockIndex] ??= {}
        headingIdsByBlock[blockIndex]![columnIndex] ??= []
        headingIdsByBlock[blockIndex]![columnIndex]!.push(id)
      })
    })
  })

  return { items, headingIdsByBlock }
}
