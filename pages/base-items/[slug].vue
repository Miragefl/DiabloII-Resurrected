<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { baseItems, load, getBySlug } = useBaseItems()
const { runewords, load: loadRunewords } = useRunewords()

await load()
await loadRunewords()

const slug = route.params.slug as string
const item = getBySlug(slug)

if (!item) {
  throw createError({ statusCode: 404, message: 'Base item not found' })
}

const displayName = computed(() =>
  locale.value === 'zh' ? item.name.zh : item.name.en,
)

const compatible = computed(() =>
  runewords.value.filter(rw => item.compatibleRunewords.includes(rw.slug)),
)

useHead({
  title: `${displayName.value} - D2R Base Items`,
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <NuxtLink :to="localePath('/base-items')" class="text-d2r-muted text-sm hover:text-d2r-primary transition-colors no-underline">
      &larr; {{ t('common.backToList') }}
    </NuxtLink>

    <div class="mt-6 mb-8">
      <h1 class="text-4xl font-heading text-d2r-accent">{{ displayName }}</h1>
      <p class="text-d2r-muted mt-2">
        {{ item.type }} &middot; Lv.{{ item.level }} &middot; {{ item.maxSockets }} {{ t('baseItems.maxSockets') }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-10">
      <div class="d2r-card p-4 space-y-2">
        <h3 class="text-d2r-accent font-semibold mb-3">Stats</h3>
        <div v-if="item.strength" class="flex justify-between text-sm">
          <span class="text-d2r-muted">{{ t('baseItems.strength') }}</span>
          <span class="text-d2r-text">{{ item.strength }}</span>
        </div>
        <div v-if="item.dexterity" class="flex justify-between text-sm">
          <span class="text-d2r-muted">{{ t('baseItems.dexterity') }}</span>
          <span class="text-d2r-text">{{ item.dexterity }}</span>
        </div>
        <div v-if="item.damage" class="flex justify-between text-sm">
          <span class="text-d2r-muted">{{ t('baseItems.damage') }}</span>
          <span class="text-d2r-text">{{ item.damage.min }}-{{ item.damage.max }}</span>
        </div>
        <div v-if="item.defense" class="flex justify-between text-sm">
          <span class="text-d2r-muted">{{ t('baseItems.defense') }}</span>
          <span class="text-d2r-text">{{ item.defense.min }}-{{ item.defense.max }}</span>
        </div>
        <div v-if="item.speed !== undefined" class="flex justify-between text-sm">
          <span class="text-d2r-muted">{{ t('baseItems.speed') }}</span>
          <span class="text-d2r-text">{{ item.speed }}</span>
        </div>
      </div>

      <div class="d2r-card p-4">
        <h3 class="text-d2r-accent font-semibold mb-3">{{ t('baseItems.maxSockets') }}</h3>
        <div class="text-4xl text-d2r-accent font-heading text-center py-4">{{ item.maxSockets }}</div>
      </div>
    </div>

    <div v-if="compatible.length > 0">
      <h2 class="text-xl font-heading text-d2r-accent mb-4">{{ t('baseItems.compatibleRunewords') }} ({{ compatible.length }})</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NuxtLink
          v-for="rw in compatible"
          :key="rw.slug"
          :to="localePath(`/runewords/${rw.slug}`)"
          class="d2r-card p-3 no-underline"
        >
          <div class="flex items-center justify-between">
            <span class="text-d2r-text font-medium">{{ locale === 'zh' ? rw.name.zh : rw.name.en }}</span>
            <span class="text-d2r-muted text-sm">{{ rw.sockets }}S &middot; Lv.{{ rw.level }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
