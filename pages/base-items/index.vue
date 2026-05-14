<script setup lang="ts">
const { baseItems, load, getTypes } = useBaseItems()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { getItemIconPath } = useItemIcon()
const { translateType } = useTypeTranslation()

await load()

const types = getTypes()
const selectedType = ref('')
const selectedTier = ref('')

const tierOptions = computed(() => {
  if (locale.value === 'zh') {
    return [
      { key: '', label: t('common.all') },
      { key: 'normal', label: '普通级' },
      { key: 'exceptional', label: '拓展级' },
      { key: 'elite', label: '精英级' },
    ]
  }
  return [
    { key: '', label: t('common.all') },
    { key: 'normal', label: 'Normal' },
    { key: 'exceptional', label: 'Exceptional' },
    { key: 'elite', label: 'Elite' },
  ]
})

const tierColors: Record<string, string> = {
  'normal': 'text-d2r-muted',
  'exceptional': 'text-blue-400',
  'elite': 'text-yellow-400',
}

const filtered = computed(() => {
  let result = baseItems.value
  if (selectedType.value) {
    result = result.filter(i => i.type === selectedType.value)
  }
  if (selectedTier.value) {
    result = result.filter(i => (i as any).tier === selectedTier.value)
  }
  return result
})

const TIER_ORDER: Record<string, number> = { elite: 0, exceptional: 1, normal: 2 }

const grouped = computed(() => {
  const groups: Record<string, typeof baseItems.value> = {}
  for (const item of filtered.value) {
    if (!groups[item.type]) groups[item.type] = []
    groups[item.type].push(item)
  }
  for (const items of Object.values(groups)) {
    items.sort((a, b) => (TIER_ORDER[(a as any).tier] ?? 9) - (TIER_ORDER[(b as any).tier] ?? 9))
  }
  return groups
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('baseItems.title') }}</h1>
      <p class="text-d2r-muted">{{ t('baseItems.subtitle') }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <button
        class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
        :class="!selectedType ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
        @click="selectedType = ''"
      >
        {{ t('common.all') }}
      </button>
      <button
        v-for="type in types"
        :key="type"
        class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
        :class="selectedType === type ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
        @click="selectedType = type"
      >
        {{ translateType(type) }}
      </button>
    </div>

    <div class="flex flex-wrap items-center gap-2 mb-6">
      <span class="text-d2r-accent text-sm font-semibold">品质</span>
      <button
        v-for="opt in tierOptions"
        :key="opt.key"
        class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
        :class="selectedTier === opt.key ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
        @click="selectedTier = opt.key"
      >
        {{ opt.label }}
      </button>
    </div>

    <div v-for="(items, type) in grouped" :key="type" class="mb-8">
      <h2 v-if="!selectedType" class="text-xl font-heading text-d2r-accent mb-3 flex items-center gap-2">
        <img :src="getItemIconPath(type)" :alt="type" class="w-6 h-6 opacity-80" />
        {{ translateType(type) }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <NuxtLink
          v-for="item in items"
          :key="item.slug"
          :to="localePath(`/base-items/${item.slug}`)"
          class="d2r-card p-4 no-underline"
        >
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2">
              <img :src="getItemIconPath(item.type, item.slug)" :alt="item.type" class="w-6 h-6 opacity-80" />
              <h3 class="text-d2r-text font-medium">{{ locale === 'zh' ? item.name.zh : item.name.en }}</h3>
            </div>
            <div class="flex items-center gap-1.5">
              <span v-if="(item as any).tier" class="text-xs font-medium" :class="tierColors[(item as any).tier]">
                {{ locale === 'zh' ? (item as any).tierZh : (item as any).tier }}
              </span>
              <span class="d2r-badge d2r-badge-gold">{{ item.maxSockets }}S</span>
            </div>
          </div>
          <div class="text-d2r-muted text-xs space-x-3">
            <span>{{ translateType(item.type) }}</span>
            <span>Lv.{{ item.level }}</span>
            <span v-if="item.strength">Str:{{ item.strength }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
