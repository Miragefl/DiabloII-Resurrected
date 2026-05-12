<script setup lang="ts">
const { baseItems, load, getTypes } = useBaseItems()
const { t, locale } = useI18n()
const localePath = useLocalePath()

await load()

const types = getTypes()
const selectedType = ref('')

const filtered = computed(() => {
  if (!selectedType.value) return baseItems.value
  return baseItems.value.filter(i => i.type === selectedType.value)
})

const grouped = computed(() => {
  const groups: Record<string, typeof baseItems.value> = {}
  for (const item of filtered.value) {
    if (!groups[item.type]) groups[item.type] = []
    groups[item.type].push(item)
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

    <div class="flex flex-wrap gap-2 mb-6">
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
        {{ type }}
      </button>
    </div>

    <div v-for="(items, type) in grouped" :key="type" class="mb-8">
      <h2 v-if="!selectedType" class="text-xl font-heading text-d2r-accent mb-3">{{ type }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <NuxtLink
          v-for="item in items"
          :key="item.slug"
          :to="localePath(`/base-items/${item.slug}`)"
          class="d2r-card p-4 no-underline"
        >
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-d2r-text font-medium">{{ locale === 'zh' ? item.name.zh : item.name.en }}</h3>
            <span class="d2r-badge d2r-badge-gold">{{ item.maxSockets }}S</span>
          </div>
          <div class="text-d2r-muted text-xs space-x-3">
            <span>{{ item.type }}</span>
            <span>Lv.{{ item.level }}</span>
            <span v-if="item.strength">Str:{{ item.strength }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
