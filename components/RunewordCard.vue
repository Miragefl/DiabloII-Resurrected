<script setup lang="ts">
import type { Runeword } from '~/types'

const props = defineProps<{
  runeword: Runeword
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { getItemIconPath } = useItemIcon()
const { translateType } = useTypeTranslation()

const displayName = computed(() =>
  locale.value === 'zh' ? props.runeword.name.zh : props.runeword.name.en,
)

const displayEffects = computed(() =>
  locale.value === 'zh' ? props.runeword.effects.zh : props.runeword.effects.en,
)

const primaryType = computed(() => props.runeword.itemTypes[0])
const itemIcon = computed(() => getItemIconPath(primaryType.value))
</script>

<template>
  <NuxtLink :to="localePath(`/runewords/${runeword.slug}`)" class="block no-underline">
    <div class="d2r-card p-4 h-full flex flex-col">
      <div class="flex items-start gap-3 mb-2">
        <img
          :src="itemIcon"
          :alt="primaryType"
          class="w-10 h-10 flex-shrink-0 opacity-80"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="text-d2r-accent font-heading text-lg">{{ displayName }}</h3>
            <div class="flex gap-1">
              <span v-if="runeword.ladderOnly" class="d2r-badge d2r-badge-red">{{ t('common.ladder') }}</span>
              <span v-if="runeword.d2rOnly" class="d2r-badge d2r-badge-purple">{{ t('common.d2rOnly') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-1 mb-2">
        <RuneIcon v-for="rune in runeword.runes" :key="rune" :name="rune" size="sm" />
      </div>

      <div class="flex items-center gap-3 text-sm text-d2r-muted mb-3">
        <span>{{ runeword.sockets }}S</span>
        <span>Lv.{{ runeword.level }}</span>
        <span>{{ translateType(primaryType) }}</span>
      </div>

      <ul class="text-xs text-d2r-muted space-y-0.5 flex-1">
        <li v-for="(effect, idx) in displayEffects.slice(0, 3)" :key="idx">{{ effect }}</li>
        <li v-if="displayEffects.length > 3" class="text-d2r-primary">
          {{ t('common.more', { count: displayEffects.length - 3 }) }}
        </li>
      </ul>
    </div>
  </NuxtLink>
</template>
