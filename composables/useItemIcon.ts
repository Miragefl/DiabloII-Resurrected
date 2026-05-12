const typeToSlug: Record<string, string> = {
  'Swords': 'swords',
  'Axes': 'axes',
  'Maces': 'maces',
  'Polearms': 'polearms',
  'Staves': 'staves',
  'Bows': 'bows',
  'Crossbows': 'crossbows',
  'Shields': 'shields',
  'Body Armor': 'body-armor',
  'Weapons': 'weapons',
  'Claws': 'claws',
  'Clubs': 'maces',
  'Hammers': 'hammers',
  'Helms': 'helms',
  'Melee Weapons': 'weapons',
  'Missile Weapons': 'bows',
  'Paladin Shields': 'shields',
  'Scepters': 'scepters',
  'Wands': 'wands',
}

export function useItemIcon() {
  function getItemIconPath(type: string): string {
    const slug = typeToSlug[type] || 'weapons'
    return `/images/items/${slug}.png`
  }

  return { getItemIconPath }
}
