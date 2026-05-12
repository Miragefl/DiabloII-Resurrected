import type { BaseItem } from '~/types'

export const useBaseItems = () => {
  const baseItems = useState<BaseItem[]>('baseItems', () => [])

  async function load() {
    if (baseItems.value.length > 0) return
    const data = await import('~/data/base-items.json')
    baseItems.value = data.default as BaseItem[]
  }

  function getBySlug(slug: string): BaseItem | undefined {
    return baseItems.value.find(i => i.slug === slug)
  }

  function getSlugs(): string[] {
    return baseItems.value.map(i => i.slug)
  }

  function getByType(type: string): BaseItem[] {
    return baseItems.value.filter(i => i.type === type)
  }

  function getTypes(): string[] {
    return [...new Set(baseItems.value.map(i => i.type))].sort()
  }

  return { baseItems, load, getBySlug, getSlugs, getByType, getTypes }
}
