<script setup lang="ts">
const { runewords, load } = useRunewords()
const { locale, t } = useI18n()
const localePath = useLocalePath()

await load()

const featured = ['enigma', 'infinity', 'spirit', 'insight', 'grief', 'faith']
const featuredRunewords = computed(() =>
  runewords.value.filter(rw => featured.includes(rw.slug)),
)

useHead({
  meta: [
    { property: 'og:title', content: 'D2R Runewords - Diablo II Resurrected Database' },
    { property: 'og:description', content: 'Complete D2R runewords, runes & base items database with stats and crafting guides.' },
    { property: 'og:url', content: 'https://d2r-runewords.vercel.app' },
    { name: 'twitter:title', content: 'D2R Runewords Database' },
    { name: 'twitter:description', content: 'Complete Diablo II Resurrected runewords, runes & base items database.' },
  ],
})
</script>

<template>
  <div>
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-d2r-bg-alt via-d2r-bg to-d2r-bg" />
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: radial-gradient(circle at 50% 50%, var(--color-d2r-primary) 0%, transparent 50%);"
      />

      <div class="relative max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-heading text-d2r-accent mb-4">
          {{ t('home.title') }}
        </h1>
        <p class="text-xl text-d2r-muted mb-8">{{ t('home.subtitle') }}</p>

        <div class="flex justify-center gap-4 flex-wrap">
          <NuxtLink
            :to="localePath('/runewords')"
            class="px-6 py-3 bg-d2r-primary text-white rounded-lg font-medium hover:bg-d2r-primary/80 transition-colors no-underline"
          >
            {{ t('nav.runewords') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/runes')"
            class="px-6 py-3 bg-d2r-card border border-d2r-border text-d2r-text rounded-lg font-medium hover:border-d2r-primary transition-colors no-underline"
          >
            {{ t('nav.runes') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/base-items')"
            class="px-6 py-3 bg-d2r-card border border-d2r-border text-d2r-text rounded-lg font-medium hover:border-d2r-primary transition-colors no-underline"
          >
            {{ t('nav.baseItems') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-heading text-d2r-accent mb-6">{{ t('home.featuredRunewords') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RunewordCard
          v-for="rw in featuredRunewords"
          :key="rw.slug"
          :runeword="rw"
        />
      </div>
    </section>
  </div>
</template>
