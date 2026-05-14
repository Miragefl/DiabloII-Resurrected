<script setup lang="ts">
const { runewords, load } = useRunewords()
const { filter, apply } = useFilter()
const { t, locale } = useI18n()
const { translateType } = useTypeTranslation()

await load()

const filtered = computed(() => apply(runewords.value))

const activeKeyword = ref<string[]>([])

const keywordTags = computed(() => {
  if (locale.value === 'zh') {
    return [
      { label: '+技能', q: '所有技能' },
      { label: 'FCR 施法', q: '高速施展' },
      { label: 'FHR 恢复', q: '再度攻击|恢复打击|打击恢复' },
      { label: 'FRW 跑速', q: '高速跑步' },
      { label: 'IAS 攻速', q: '攻击速度' },
      { label: 'CB 压碎', q: '压碎性打击' },
      { label: 'DS 致命', q: '致命攻击' },
      { label: 'OW 撕开', q: '撕开伤口' },
      { label: 'ED 伤害', q: '增强伤害' },
      { label: 'ITD 忽防', q: '忽略目标防御' },
      { label: 'CBF 免冰', q: '无法冰冻' },
      { label: 'IND 不毁', q: '无法破坏|永不磨损' },
      { label: 'TP 传送', q: '传送' },
      { label: 'MF 寻宝', q: '魔法装备出现概率' },
      { label: '灵气', q: '灵气' },
      { label: '全抗', q: '所有抗性' },
      { label: '减抗', q: '敌人闪电抗|敌人火焰抗|敌人冰冷抗|敌人毒素抗|敌人火防|敌人冰防|敌人电防|敌人防火|敌人防冰|敌人防毒' },
      { label: 'LL 吸血', q: '偷取生命' },
      { label: 'ML 吸蓝', q: '偷取法力' },
    ]
  }
  return [
    { label: '+Skills', q: 'To All Skills' },
    { label: 'FCR', q: 'Faster Cast Rate' },
    { label: 'FHR', q: 'Faster Hit Recovery' },
    { label: 'FRW', q: 'Faster Run/Walk' },
    { label: 'IAS', q: 'Attack Speed' },
    { label: 'CB', q: 'Crushing Blow' },
    { label: 'DS', q: 'Deadly Strike' },
    { label: 'OW', q: 'Open Wounds' },
    { label: 'ED%', q: 'Enhanced Damage' },
    { label: 'ITD', q: "Ignore Target" },
    { label: 'CBF', q: 'Cannot Be Frozen' },
    { label: 'IND', q: 'Indestructible' },
    { label: 'TP', q: 'Teleport' },
    { label: 'MF', q: 'Magic Find' },
    { label: 'Aura', q: 'Aura' },
    { label: 'All Res', q: 'All Resistances' },
    { label: '-Enemy Res', q: 'To Enemy' },
    { label: 'LL', q: 'Life Stolen' },
  ]
})

function toggleKeyword(tag: { label: string; q: string }) {
  const idx = activeKeyword.value.indexOf(tag.q)
  if (idx >= 0) {
    activeKeyword.value.splice(idx, 1)
  } else {
    activeKeyword.value.push(tag.q)
  }
  filter.value.keywords = [...activeKeyword.value]
}

const itemTypeOptions = [
  'Axes', 'Body Armor', 'Bows', 'Claws', 'Crossbows',
  'Daggers', 'Hammers', 'Helms', 'Maces', 'Melee Weapons', 'Missile Weapons',
  'Paladin Shields', 'Polearms', 'Scepters', 'Shields',
  'Spears', 'Amazon Spears', 'Staves', 'Swords', 'Wands', 'Weapons',
]

function toggleSocket(socket: number) {
  const idx = filter.value.sockets.indexOf(socket)
  if (idx >= 0) filter.value.sockets.splice(idx, 1)
  else filter.value.sockets.push(socket)
}

function toggleItemType(type: string) {
  const idx = filter.value.itemTypes.indexOf(type)
  if (idx >= 0) filter.value.itemTypes.splice(idx, 1)
  else filter.value.itemTypes.push(type)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('runewords.title') }}</h1>
      <p class="text-d2r-muted">{{ t('runewords.subtitle', { count: runewords.length }) }}</p>
    </div>

    <div class="d2r-card p-4 mb-6 space-y-4">
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <SearchBar v-model="filter.search" :placeholder="t('runewords.searchPlaceholder')" />
        </div>
        <div class="flex gap-2">
          <button
            v-for="sortOpt in (['name', 'level', 'sockets'] as const)"
            :key="sortOpt"
            class="px-3 py-2 rounded text-sm cursor-pointer transition-colors"
            :class="filter.sort === sortOpt ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border'"
            @click="filter.sort = sortOpt"
          >
            {{ t(`runewords.sortBy${sortOpt.charAt(0).toUpperCase() + sortOpt.slice(1)}`) }}
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div class="flex items-center gap-2">
          <span class="text-d2r-accent text-sm font-semibold whitespace-nowrap">{{ t('runewords.sockets') }}</span>
          <div class="flex gap-1.5">
            <button
              v-for="s in ([2, 3, 4, 5, 6] as const)"
              :key="s"
              class="px-2.5 py-1 rounded text-sm cursor-pointer transition-colors"
              :class="filter.sockets.includes(s) ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
              @click="toggleSocket(s)"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-d2r-accent text-sm font-semibold whitespace-nowrap">{{ t('runewords.level') }}</span>
          <div class="flex items-center gap-1.5 text-sm text-d2r-muted">
            <span>Lv.{{ filter.levelRange[0] }}</span>
            <input
              type="range"
              :min="1"
              :max="99"
              :value="filter.levelRange[1]"
              class="w-24 accent-d2r-primary"
              @input="filter.levelRange = [filter.levelRange[0], Number(($event.target as HTMLInputElement).value)]"
            />
            <span>Lv.{{ filter.levelRange[1] }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="px-2.5 py-1 rounded text-sm cursor-pointer transition-colors font-semibold"
            :class="filter.popularOnly ? 'text-white border-none' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
            :style="filter.popularOnly ? 'background-color: #f97316' : ''"
            @click="filter.popularOnly = !filter.popularOnly"
          >
            HOT
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="px-2.5 py-1 rounded text-sm cursor-pointer transition-colors"
            :class="filter.ladderOnly === null ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border'"
            @click="filter.ladderOnly = null"
          >
            {{ t('common.all') }}
          </button>
          <button
            class="px-2.5 py-1 rounded text-sm cursor-pointer transition-colors"
            :class="filter.ladderOnly === true ? 'bg-d2r-danger text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border'"
            @click="filter.ladderOnly = true"
          >
            {{ t('common.ladder') }}
          </button>
          <button
            class="px-2.5 py-1 rounded text-sm cursor-pointer transition-colors"
            :class="filter.ladderOnly === false ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border'"
            @click="filter.ladderOnly = false"
          >
            {{ t('common.nonLadder') }}
          </button>
        </div>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="type in itemTypeOptions"
            :key="type"
            class="px-2 py-0.5 rounded text-xs cursor-pointer transition-colors"
            :class="filter.itemTypes.includes(type) ? 'bg-d2r-primary text-white' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
            @click="toggleItemType(type)"
          >
            {{ translateType(type) }}
          </button>
        </div>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="tag in keywordTags"
            :key="tag.q"
            class="px-2 py-0.5 rounded text-xs cursor-pointer transition-colors"
            :class="activeKeyword.includes(tag.q) ? 'd2r-keyword-active' : 'bg-d2r-bg-alt text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
            @click="toggleKeyword(tag)"
          >
            {{ tag.label }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="text-center py-12 text-d2r-muted">
      {{ t('runewords.noResults') }}
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <RunewordCard
        v-for="rw in filtered"
        :key="rw.slug"
        :runeword="rw"
      />
    </div>
  </div>
</template>
