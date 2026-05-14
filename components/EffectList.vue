<script setup lang="ts">
const { locale } = useI18n()

defineProps<{
  effects: string[]
}>()

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

function highlight(text: string): string {
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
  <ul class="space-y-1">
    <li
      v-for="(effect, idx) in effects"
      :key="idx"
      class="text-sm text-d2r-text flex items-start gap-2"
    >
      <span class="text-d2r-accent mt-0.5">&#9670;</span>
      <span v-html="highlight(effect)" />
    </li>
  </ul>
</template>
