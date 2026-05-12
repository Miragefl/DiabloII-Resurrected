<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { runes, load, getById } = useRunes()
const { runewords, load: loadRunewords, getByRune } = useRunewords()

await load()
await loadRunewords()

const id = Number(route.params.id)
const rune = getById(id)

if (!rune) {
  throw createError({ statusCode: 404, message: 'Rune not found' })
}

const usedInRunewords = getByRune(rune.name)

useHead({
  title: `${rune.name} (#${rune.id}) - D2R Runes`,
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <NuxtLink :to="localePath('/runes')" class="text-d2r-muted text-sm hover:text-d2r-primary transition-colors no-underline">
      &larr; {{ t('common.backToList') }}
    </NuxtLink>

    <div class="mt-6 mb-8 text-center">
      <RuneIcon :name="rune.name" size="lg" class="mx-auto mb-3" />
      <h1 class="text-4xl font-heading text-d2r-accent">{{ rune.name }}</h1>
      <p class="text-d2r-muted mt-1">#{{ rune.id }} &middot; {{ rune.nameZh }} &middot; Lv.{{ rune.level }}</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-10">
      <div class="d2r-card p-4">
        <h3 class="text-d2r-accent font-semibold mb-3">{{ t('runes.weapon') }}</h3>
        <p class="text-d2r-text text-sm">{{ rune.weaponEffect }}</p>
      </div>
      <div class="d2r-card p-4">
        <h3 class="text-d2r-accent font-semibold mb-3">{{ t('runes.armor') }}</h3>
        <p class="text-d2r-text text-sm">{{ rune.armorEffect }}</p>
      </div>
      <div class="d2r-card p-4">
        <h3 class="text-d2r-accent font-semibold mb-3">{{ t('runes.shield') }}</h3>
        <p class="text-d2r-text text-sm">{{ rune.shieldEffect }}</p>
      </div>
    </div>

    <div class="mb-10">
      <h3 class="text-xl font-heading text-d2r-accent mb-4">{{ t('runes.dropLevel') }}</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="d2r-card p-3 text-center">
          <div class="text-d2r-muted text-xs mb-1">{{ t('runes.normal') }}</div>
          <div class="text-d2r-text font-bold">{{ rune.dropLevel.normal }}</div>
        </div>
        <div class="d2r-card p-3 text-center">
          <div class="text-d2r-muted text-xs mb-1">{{ t('runes.nightmare') }}</div>
          <div class="text-d2r-text font-bold">{{ rune.dropLevel.nightmare }}</div>
        </div>
        <div class="d2r-card p-3 text-center">
          <div class="text-d2r-muted text-xs mb-1">{{ t('runes.hell') }}</div>
          <div class="text-d2r-text font-bold">{{ rune.dropLevel.hell }}</div>
        </div>
      </div>
    </div>

    <div v-if="usedInRunewords.length > 0">
      <h3 class="text-xl font-heading text-d2r-accent mb-4">{{ t('runes.usedIn') }} ({{ usedInRunewords.length }})</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NuxtLink
          v-for="rw in usedInRunewords"
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
