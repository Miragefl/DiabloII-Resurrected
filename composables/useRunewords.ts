import type { Runeword } from '~/types'

export const useRunewords = () => {
  const runewords = useState<Runeword[]>('runewords', () => [])

  async function load() {
    if (runewords.value.length > 0) return
    const data = await import('~/data/runewords.json')
    runewords.value = data.default as Runeword[]
  }

  function getBySlug(slug: string): Runeword | undefined {
    return runewords.value.find(r => r.slug === slug)
  }

  function getSlugs(): string[] {
    return runewords.value.map(r => r.slug)
  }

  function getByRune(runeName: string): Runeword[] {
    return runewords.value.filter(r =>
      r.runes.some(rune => rune.toLowerCase() === runeName.toLowerCase()),
    )
  }

  return { runewords, load, getBySlug, getSlugs, getByRune }
}
