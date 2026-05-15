<script setup lang="ts">
const { runes, load } = useRunes()
const { t, locale } = useI18n()
const localePath = useLocalePath()

await load()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('runes.title') }}</h1>
      <p class="text-d2r-muted">{{ t('runes.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="rune in runes"
        :key="rune.id"
        :to="localePath(`/runes/${rune.id}`)"
        class="d2r-card p-4 no-underline"
      >
        <div class="flex items-center gap-3 mb-3">
          <RuneIcon :name="rune.name" size="lg" />
          <div>
            <div class="text-d2r-accent font-bold">#{{ rune.id }} {{ rune.name }}</div>
            <div class="text-d2r-muted text-sm">{{ rune.nameZh }} · Lv.{{ rune.level }}</div>
          </div>
        </div>
        <div class="space-y-1 text-xs text-d2r-muted">
          <div><span class="text-d2r-accent font-medium">{{ t('runes.weapon') }}:</span> {{ locale === 'zh' ? rune.weaponEffectZh : rune.weaponEffect }}</div>
          <div><span class="text-d2r-accent font-medium">{{ t('runes.armor') }}:</span> {{ locale === 'zh' ? rune.armorEffectZh : rune.armorEffect }}</div>
          <div><span class="text-d2r-accent font-medium">{{ t('runes.shield') }}:</span> {{ locale === 'zh' ? rune.shieldEffectZh : rune.shieldEffect }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
