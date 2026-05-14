<script setup lang="ts">
import craftedData from '~/data/crafted-items.json'
const { locale, t } = useI18n()

const activeCategory = ref<string>('all')
const activeSlot = ref<string>('all')

interface CraftedItem {
  slug: string
  name: { en: string; zh: string }
  category: { en: string; zh: string }
  slot: string
  slotZh: string
  gem: string
  gemZh: string
  rune: { name: string; nameZh: string; number: number }
  baseItems: { en: string[]; zh: string[] }
  fixedMods: { en: string[]; zh: string[] }
}

const items = craftedData as CraftedItem[]

const slots = computed(() => {
  const seen = new Map<string, { en: string; zh: string }>()
  for (const item of items) {
    if (!seen.has(item.slot)) {
      seen.set(item.slot, { en: item.slot, zh: item.slotZh })
    }
  }
  return [...seen.entries()].map(([key, label]) => ({ key, label }))
})

const categories = computed(() => [
  { key: 'all', label: t('common.all') },
  { key: 'Blood', label: t('crafted.blood') },
  { key: 'Caster', label: t('crafted.caster') },
  { key: 'Hit Power', label: t('crafted.hitPower') },
  { key: 'Safety', label: t('crafted.safety') },
])

const filtered = computed(() => {
  let result = items
  if (activeCategory.value !== 'all') {
    result = result.filter(i => i.category.en === activeCategory.value)
  }
  if (activeSlot.value !== 'all') {
    result = result.filter(i => i.slot === activeSlot.value)
  }
  return result
})

const categoryColors: Record<string, string> = {
  'Blood': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Caster': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Hit Power': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Safety': 'bg-green-500/20 text-green-400 border-green-500/30',
}

useHead({ title: `${t('crafted.title')} - D2R` })
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('crafted.title') }}</h1>
      <p class="text-d2r-muted">{{ t('crafted.subtitle', { count: items.length }) }}</p>
    </div>

    <div class="d2r-card p-4 mb-6 space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-d2r-accent text-sm font-semibold">{{ t('crafted.category') }}</span>
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="activeCategory === cat.key ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-d2r-accent text-sm font-semibold">{{ t('crafted.slot') }}</span>
        <button
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="activeSlot === 'all' ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
          @click="activeSlot = 'all'"
        >
          {{ t('common.all') }}
        </button>
        <button
          v-for="s in slots"
          :key="s.key"
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="activeSlot === s.key ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
          @click="activeSlot = s.key"
        >
          {{ locale === 'zh' ? s.label.zh : s.label.en }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in filtered" :key="item.slug" class="d2r-card p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-d2r-accent font-heading text-lg">
            {{ locale === 'zh' ? item.name.zh : item.name.en }}
          </h3>
          <span
            class="px-2 py-0.5 rounded text-xs border"
            :class="categoryColors[item.category.en] || 'bg-d2r-bg-alt text-d2r-muted border-d2r-border'"
          >
            {{ locale === 'zh' ? item.category.zh : item.category.en }}
          </span>
        </div>

        <div class="text-sm text-d2r-muted mb-3">
          <span class="text-d2r-text font-medium">{{ t('crafted.slot') }}:</span> {{ locale === 'zh' ? item.slotZh : item.slot }}
        </div>

        <div class="p-3 mb-3 bg-d2r-bg-alt border border-d2r-border rounded">
          <div class="text-xs text-d2r-accent font-semibold mb-1.5">{{ t('crafted.recipe') }}</div>
          <div class="text-sm text-d2r-text">
            {{ locale === 'zh' ? item.baseItems.zh.join(' / ') : item.baseItems.en.join(' / ') }}
            +
            <span class="text-d2r-primary">{{ locale === 'zh' ? item.gemZh : item.gem }}</span>
            +
            <span class="text-d2r-accent">#{{ item.rune.number }} {{ locale === 'zh' ? item.rune.nameZh : item.rune.name }}</span>
          </div>
        </div>

        <div>
          <div class="text-xs text-d2r-accent font-semibold mb-1.5">{{ t('crafted.fixedMods') }}</div>
          <ul class="text-sm text-d2r-muted space-y-0.5">
            <li v-for="(mod, idx) in (locale === 'zh' ? item.fixedMods.zh : item.fixedMods.en)" :key="idx">
              {{ mod }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="text-center py-12 text-d2r-muted">
      {{ t('runewords.noResults') }}
    </div>
  </div>
</template>
