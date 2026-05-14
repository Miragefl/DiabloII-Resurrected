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

// Category-based highlighting
const CATEGORIES_EN: Record<string, RegExp[]> = {
  'd2r-hl-skill': [
    /To All Skills/i,
    /To Skill Levels/i,
    /To Teleport/i,
  ],
  'd2r-hl-cast': [
    /Faster Cast Rate/i,
  ],
  'd2r-hl-offense': [
    /Enhanced Damage/i,
    /Increased Attack Speed/i,
    /Crushing Blow/i,
    /Deadly Strike/i,
    /Open Wounds/i,
    /Ignore Target'?s? Defense/i,
    /To Enemy .+ Resistance/i,
    /Damage \+\d/i,
    /Adds .* Damage/i,
    /Pierce/i,
  ],
  'd2r-hl-defense': [
    /Cannot Be Frozen/i,
    /All Resistances/i,
    /Faster Hit Recovery/i,
    /Enhanced Defense/i,
    /Faster Block Rate/i,
    /Indestructible/i,
  ],
  'd2r-hl-move': [
    /Faster Run\/Walk/i,
    /Aura When Equipped/i,
    /Level \d+ .+ Aura/i,
    /Magic Find/i,
  ],
}

const CATEGORIES_ZH: Record<string, RegExp[]> = {
  'd2r-hl-skill': [
    /所有技能/i,
    /传送/i,
  ],
  'd2r-hl-cast': [
    /施放法术|施展速度/i,
  ],
  'd2r-hl-offense': [
    /增强伤害|伤害力/i,
    /攻击速度/i,
    /压碎性打击/i,
    /致命攻击/i,
    /撕开伤口/i,
    /忽略目标防御/i,
    /敌人.*抗性/i,
    /增加.*伤害/i,
    /穿透/i,
  ],
  'd2r-hl-defense': [
    /无法冰冻/i,
    /所有抗性/i,
    /再度攻击|恢复打击|打击恢复/i,
    /防御强化/i,
    /格挡/i,
    /无法破坏|永不磨损/i,
  ],
  'd2r-hl-move': [
    /高速跑步|移动.*奔跑/i,
    /灵气/i,
    /魔法装备出现概率/i,
  ],
}

// Slang tag extraction
const SLANG_MAP: [RegExp, string][] = locale.value === 'zh' ? [
  [/所有技能/, '+Skill'],
  [/施放法术|施展速度/, 'FCR'],
  [/再度攻击|恢复打击|打击恢复/, 'FHR'],
  [/高速跑步|移动.*奔跑/, 'FRW'],
  [/攻击速度/, 'IAS'],
  [/压碎性打击/, 'CB'],
  [/致命攻击/, 'DS'],
  [/撕开伤口/, 'OW'],
  [/增强伤害|伤害力/, 'ED%'],
  [/忽略目标防御/, 'ITD'],
  [/无法冰冻/, 'CBF'],
  [/无法破坏|永不磨损/, 'IND'],
  [/传送/, 'TP'],
  [/魔法装备出现概率/, 'MF'],
  [/灵气/, 'Aura'],
  [/所有抗性/, 'Res All'],
  [/敌人.*抗性/, '-Res'],
  [/偷取生命/, 'LL'],
  [/偷取法力/, 'ML'],
] : [
  [/To All Skills/i, '+Skill'],
  [/Faster Cast Rate/i, 'FCR'],
  [/Faster Hit Recovery/i, 'FHR'],
  [/Faster Run\/Walk/i, 'FRW'],
  [/Attack Speed/i, 'IAS'],
  [/Crushing Blow/i, 'CB'],
  [/Deadly Strike/i, 'DS'],
  [/Open Wounds/i, 'OW'],
  [/Enhanced Damage/i, 'ED%'],
  [/Ignore Target/i, 'ITD'],
  [/Cannot Be Frozen/i, 'CBF'],
  [/Indestructible/i, 'IND'],
  [/Teleport/i, 'TP'],
  [/Magic Find/i, 'MF'],
  [/Aura/i, 'Aura'],
  [/All Resistances/i, 'Res All'],
  [/To Enemy .+ Resistance/i, '-Res'],
  [/Life Stolen/i, 'LL'],
  [/Mana Stolen/i, 'ML'],
]

const slangTags = computed(() => {
  const effects = locale.value === 'zh' ? props.runeword.effects.zh : props.runeword.effects.en
  const tags = new Set<string>()
  for (const e of effects) {
    for (const [pattern, tag] of SLANG_MAP) {
      if (pattern.test(e)) tags.add(tag)
    }
  }
  return [...tags]
})

function highlightEffect(text: string): string {
  const cats = locale.value === 'zh' ? CATEGORIES_ZH : CATEGORIES_EN
  const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  for (const [cls, patterns] of Object.entries(cats)) {
    if (patterns.some(p => p.test(text))) {
      return `<span class="${cls}">${escaped}</span>`
    }
  }
  return escaped
}
</script>

<template>
  <NuxtLink :to="localePath(`/runewords/${runeword.slug}`)" class="block no-underline">
    <div class="d2r-card p-4 h-full flex flex-col">
      <div class="flex items-start gap-2.5 mb-2">
        <img
          :src="itemIcon"
          :alt="primaryType"
          class="w-11 h-11 flex-shrink-0 opacity-80"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1">
            <h3 class="text-d2r-accent font-heading text-lg leading-tight">{{ displayName }}</h3>
            <div class="flex gap-1 flex-shrink-0">
              <span v-if="runeword.popular" class="d2r-badge d2r-badge-orange">HOT</span>
              <span v-if="runeword.ladderOnly" class="d2r-badge d2r-badge-red">{{ t('common.ladder') }}</span>
              <span v-if="runeword.d2rOnly" class="d2r-badge d2r-badge-purple">{{ t('common.d2rOnly') }}</span>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm text-d2r-muted mt-1">
            <span>{{ runeword.sockets }}S</span>
            <span>Lv.{{ runeword.level }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-1.5 mb-2">
        <div v-for="(rune, idx) in runeword.runes" :key="rune" class="flex items-center gap-0.5">
          <span class="text-d2r-accent font-bold text-sm">#{{ runeword.runeNumbers[idx] }}</span>
          <RuneIcon :name="rune" size="sm" />
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-3">
        <span
          v-for="type in runeword.itemTypes"
          :key="type"
          class="inline-flex items-center gap-1 px-2 py-0.5 bg-d2r-bg-alt border border-d2r-border rounded text-sm text-d2r-muted"
        >
          <img :src="getItemIconPath(type)" :alt="type" class="w-4 h-4 opacity-70" />
          {{ translateType(type) }}
        </span>
      </div>

      <ul class="text-sm space-y-0.5 flex-1">
        <li v-for="(effect, idx) in displayEffects" :key="idx" class="text-d2r-muted" v-html="highlightEffect(effect)" />
      </ul>

      <div v-if="slangTags.length" class="flex flex-wrap gap-1 mt-2 pt-2 border-t border-d2r-border">
        <span v-for="tag in slangTags" :key="tag" class="d2r-badge d2r-badge-gold text-xs">{{ tag }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
