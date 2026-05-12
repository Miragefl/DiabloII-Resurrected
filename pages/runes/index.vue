<script setup lang="ts">
const { runes, load } = useRunes()
const { t } = useI18n()
const localePath = useLocalePath()

await load()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('runes.title') }}</h1>
      <p class="text-d2r-muted">{{ t('runes.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <NuxtLink
        v-for="rune in runes"
        :key="rune.id"
        :to="localePath(`/runes/${rune.id}`)"
        class="d2r-card p-4 flex flex-col items-center gap-2 no-underline"
      >
        <RuneIcon :name="rune.name" size="lg" />
        <div class="text-center">
          <div class="text-d2r-accent font-bold text-sm">#{{ rune.id }}</div>
          <div class="text-d2r-text font-medium">{{ rune.name }}</div>
          <div class="text-d2r-muted text-xs">{{ rune.nameZh }}</div>
        </div>
        <div class="text-d2r-muted text-xs">Lv.{{ rune.level }}</div>
      </NuxtLink>
    </div>
  </div>
</template>
