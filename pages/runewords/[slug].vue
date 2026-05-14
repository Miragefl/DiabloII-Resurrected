<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { runewords, load, getBySlug, getSlugs } = useRunewords()
const { runes, load: loadRunes, getByName } = useRunes()
const { baseItems, load: loadBaseItems } = useBaseItems()
const { getItemIconPath } = useItemIcon()
const { translateType, translateClass } = useTypeTranslation()

await load()
await loadRunes()
await loadBaseItems()

const slug = route.params.slug as string
const runeword = getBySlug(slug)

if (!runeword) {
  throw createError({ statusCode: 404, message: 'Runeword not found' })
}

const displayName = computed(() =>
  locale.value === 'zh' ? runeword.name.zh : runeword.name.en,
)

const displayEffects = computed(() =>
  locale.value === 'zh' ? runeword.effects.zh : runeword.effects.en,
)

const allSlugs = getSlugs()
const currentIdx = allSlugs.indexOf(slug)
const prevSlug = currentIdx > 0 ? allSlugs[currentIdx - 1] : null
const nextSlug = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null

const compatibleBases = computed(() =>
  baseItems.value.filter(i => i.compatibleRunewords.includes(slug)),
)

const itemIcons = computed(() =>
  runeword.itemTypes.map(type => ({ type, icon: getItemIconPath(type) })),
)

useHead({
  title: `${displayName.value} - D2R Runewords`,
  meta: [
    { name: 'description', content: displayEffects.value.slice(0, 3).join(', ') },
  ],
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <NuxtLink :to="localePath('/runewords')" class="text-d2r-muted text-sm hover:text-d2r-primary transition-colors no-underline">
      &larr; {{ t('common.backToList') }}
    </NuxtLink>

    <div class="mt-6 mb-8">
      <div class="flex items-start gap-4 mb-2">
        <div class="flex gap-2">
          <img
            v-for="ii in itemIcons"
            :key="ii.type"
            :src="ii.icon"
            :alt="ii.type"
            class="w-14 h-14"
          />
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-4xl font-heading text-d2r-accent">{{ displayName }}</h1>
            <span v-if="runeword.popular" class="d2r-badge d2r-badge-orange">HOT</span>
            <span v-if="runeword.ladderOnly" class="d2r-badge d2r-badge-red">{{ t('common.ladder') }}</span>
            <span v-if="runeword.d2rOnly" class="d2r-badge d2r-badge-purple">{{ t('common.d2rOnly') }}</span>
          </div>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-d2r-muted text-sm">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="type in runeword.itemTypes"
                :key="type"
                class="inline-flex items-center gap-1 px-2 py-0.5 bg-d2r-bg-alt border border-d2r-border rounded text-xs"
              >
                <img :src="getItemIconPath(type)" :alt="type" class="w-3.5 h-3.5 opacity-70" />
                {{ translateType(type) }}
              </span>
            </div>
            <span>{{ runeword.sockets }} {{ t('runewords.sockets') }}</span>
            <span>Lv.{{ runeword.level }}</span>
            <span>{{ t('common.patch') }} {{ runeword.patch }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-heading text-d2r-accent mb-4">{{ t('runewords.runes') }}</h2>
        <div class="space-y-2">
          <RuneSlot
            v-for="(rune, idx) in runeword.runes"
            :key="idx"
            :rune-name="rune"
            :rune-number="runeword.runeNumbers[idx]"
            :weapon-effect="locale === 'zh' ? getByName(rune)?.weaponEffectZh : getByName(rune)?.weaponEffect"
            :armor-effect="locale === 'zh' ? getByName(rune)?.armorEffectZh : getByName(rune)?.armorEffect"
            :shield-effect="locale === 'zh' ? getByName(rune)?.shieldEffectZh : getByName(rune)?.shieldEffect"
          />
        </div>

        <div v-if="runeword.bestFor?.length" class="mt-6">
          <h3 class="text-sm font-semibold text-d2r-accent mb-2">{{ t('runewords.bestFor') }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="cls in runeword.bestFor" :key="cls" class="d2r-badge d2r-badge-gold">
              {{ translateClass(cls) }}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-heading text-d2r-accent mb-4">{{ t('runewords.effects') }}</h2>
        <EffectList :effects="displayEffects" />
      </div>
    </div>

    <div v-if="compatibleBases.length > 0" class="mt-10">
      <h2 class="text-xl font-heading text-d2r-accent mb-4">{{ t('runewords.compatibleBases') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NuxtLink
          v-for="item in compatibleBases"
          :key="item.slug"
          :to="localePath(`/base-items/${item.slug}`)"
          class="d2r-card p-3 no-underline"
        >
          <div class="flex items-center gap-3">
            <img
              :src="getItemIconPath(item.type, item.slug)"
              :alt="item.type"
              class="w-8 h-8 opacity-80"
            />
            <div class="flex-1 flex items-center justify-between">
              <span class="text-d2r-text">{{ locale === 'zh' ? item.name.zh : item.name.en }}</span>
              <span class="text-d2r-muted text-sm">{{ item.maxSockets }}S</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="flex justify-between mt-10 pt-6 border-t border-d2r-border">
      <NuxtLink
        v-if="prevSlug"
        :to="localePath(`/runewords/${prevSlug}`)"
        class="text-d2r-muted hover:text-d2r-primary transition-colors no-underline"
      >
        &larr; {{ t('runewords.prev') }}
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="nextSlug"
        :to="localePath(`/runewords/${nextSlug}`)"
        class="text-d2r-muted hover:text-d2r-primary transition-colors no-underline"
      >
        {{ t('runewords.next') }} &rarr;
      </NuxtLink>
    </div>
  </div>
</template>
