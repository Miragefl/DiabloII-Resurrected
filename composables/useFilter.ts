import type { FilterState, Runeword } from '~/types'

export const useFilter = () => {
  const filter = useState<FilterState>('filter', () => ({
    sockets: [],
    itemTypes: [],
    levelRange: [1, 99] as [number, number],
    ladderOnly: null as boolean | null,
    popularOnly: false,
    classFilter: '',
    search: '',
    keywords: [] as string[],
    sort: 'level' as 'name' | 'level' | 'sockets',
  }))

  function apply(items: Runeword[]): Runeword[] {
    let result = [...items]

    if (filter.value.sockets.length > 0) {
      result = result.filter(r => filter.value.sockets.includes(r.sockets))
    }

    if (filter.value.itemTypes.length > 0) {
      result = result.filter(r =>
        r.itemTypes.some(t => filter.value.itemTypes.includes(t)),
      )
    }

    result = result.filter(r =>
      r.level >= filter.value.levelRange[0] &&
      r.level <= filter.value.levelRange[1],
    )

    if (filter.value.ladderOnly === true) {
      result = result.filter(r => r.ladderOnly)
    } else if (filter.value.ladderOnly === false) {
      result = result.filter(r => !r.ladderOnly)
    }

    if (filter.value.popularOnly) {
      result = result.filter(r => r.popular)
    }

    if (filter.value.classFilter) {
      result = result.filter(r =>
        r.bestFor?.some(c =>
          c.toLowerCase().includes(filter.value.classFilter.toLowerCase()),
        ),
      )
    }

    if (filter.value.search) {
      const terms = filter.value.search.split('|')
      result = result.filter(r =>
        terms.some(q => {
          const ql = q.toLowerCase()
          return r.name.en.toLowerCase().includes(ql) ||
            r.name.zh.includes(q) ||
            r.effects.en.some(e => e.toLowerCase().includes(ql)) ||
            r.effects.zh.some(e => e.includes(q)) ||
            r.runes.some(rn => rn.toLowerCase().includes(ql))
        }),
      )
    }

    if (filter.value.keywords.length > 0) {
      result = result.filter(r =>
        filter.value.keywords.every(kw => {
          const terms = kw.split('|')
          return terms.some(q => {
            const ql = q.toLowerCase()
            return r.name.en.toLowerCase().includes(ql) ||
              r.name.zh.includes(q) ||
              r.effects.en.some(e => e.toLowerCase().includes(ql)) ||
              r.effects.zh.some(e => e.includes(q)) ||
              r.runes.some(rn => rn.toLowerCase().includes(ql))
          })
        }),
      )
    }

    const sortKey = filter.value.sort
    result.sort((a, b) => {
      if (sortKey === 'level') return a.level - b.level
      if (sortKey === 'sockets') return a.sockets - b.sockets
      return a.name.en.localeCompare(b.name.en)
    })

    return result
  }

  function reset() {
    filter.value = {
      sockets: [],
      itemTypes: [],
      levelRange: [1, 99],
      ladderOnly: null,
      popularOnly: false,
      classFilter: '',
      search: '',
      keywords: [],
      sort: 'name',
    }
  }

  return { filter, apply, reset }
}
