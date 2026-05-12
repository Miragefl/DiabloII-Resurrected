export interface Runeword {
  slug: string
  name: { en: string; zh: string }
  runes: string[]
  runeNumbers: number[]
  sockets: number
  itemTypes: string[]
  level: number
  ladderOnly: boolean
  d2rOnly: boolean
  patch: string
  effects: { en: string[]; zh: string[] }
  bestFor?: string[]
}

export interface Rune {
  id: number
  name: string
  nameZh: string
  level: number
  weaponEffect: string
  armorEffect: string
  shieldEffect: string
  dropLevel: { normal: number; nightmare: number; hell: number }
}

export interface BaseItem {
  slug: string
  name: { en: string; zh: string }
  type: string
  maxSockets: number
  level: number
  strength?: number
  dexterity?: number
  damage?: { min: number; max: number }
  speed?: number
  defense?: { min: number; max: number }
  compatibleRunewords: string[]
}

export type ItemType =
  | 'Axes'
  | 'Body Armor'
  | 'Bows'
  | 'Claws'
  | 'Clubs'
  | 'Crossbows'
  | 'Hammers'
  | 'Helms'
  | 'Maces'
  | 'Melee Weapons'
  | 'Missile Weapons'
  | 'Paladin Shields'
  | 'Polearms'
  | 'Scepters'
  | 'Shields'
  | 'Staves'
  | 'Swords'
  | 'Wands'
  | 'Weapons'

export interface FilterState {
  sockets: number[]
  itemTypes: string[]
  levelRange: [number, number]
  ladderOnly: boolean | null
  classFilter: string
  search: string
  sort: 'name' | 'level' | 'sockets'
}
