import type { Rune } from '~/types'

export const useRunes = () => {
  const runes = useState<Rune[]>('runes', () => [])

  async function load() {
    if (runes.value.length > 0) return
    const data = await import('~/data/runes.json')
    runes.value = data.default as Rune[]
  }

  function getById(id: number): Rune | undefined {
    return runes.value.find(r => r.id === id)
  }

  function getByName(name: string): Rune | undefined {
    return runes.value.find(r => r.name.toLowerCase() === name.toLowerCase())
  }

  function getIds(): number[] {
    return runes.value.map(r => r.id)
  }

  return { runes, load, getById, getByName, getIds }
}
