<script setup lang="ts">
import type { FilterState } from '~/types'

const props = defineProps<{
  modelValue: FilterState
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterState]
}>()

const { t } = useI18n()
const { translateType } = useTypeTranslation()

const socketOptions = [2, 3, 4, 5, 6]
const itemTypeOptions = [
  'Axes', 'Body Armor', 'Bows', 'Claws', 'Crossbows',
  'Hammers', 'Helms', 'Maces', 'Melee Weapons', 'Missile Weapons',
  'Paladin Shields', 'Polearms', 'Scepters', 'Shields',
  'Staves', 'Swords', 'Wands', 'Weapons',
]

function toggleSocket(socket: number) {
  const current = [...props.modelValue.sockets]
  const idx = current.indexOf(socket)
  if (idx >= 0) current.splice(idx, 1)
  else current.push(socket)
  emit('update:modelValue', { ...props.modelValue, sockets: current })
}

function toggleItemType(type: string) {
  const current = [...props.modelValue.itemTypes]
  const idx = current.indexOf(type)
  if (idx >= 0) current.splice(idx, 1)
  else current.push(type)
  emit('update:modelValue', { ...props.modelValue, itemTypes: current })
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h4 class="text-d2r-accent text-sm font-semibold mb-2">{{ t('runewords.sockets') }}</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="s in socketOptions"
          :key="s"
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="modelValue.sockets.includes(s)
            ? 'bg-d2r-primary text-white'
            : 'bg-d2r-card text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
          @click="toggleSocket(s)"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <div>
      <h4 class="text-d2r-accent text-sm font-semibold mb-2">{{ t('runewords.itemTypes') }}</h4>
      <div class="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
        <button
          v-for="type in itemTypeOptions"
          :key="type"
          class="px-2 py-0.5 rounded text-xs cursor-pointer transition-colors"
          :class="modelValue.itemTypes.includes(type)
            ? 'bg-d2r-primary text-white'
            : 'bg-d2r-card text-d2r-muted border border-d2r-border hover:border-d2r-primary'"
          @click="toggleItemType(type)"
        >
          {{ translateType(type) }}
        </button>
      </div>
    </div>

    <div>
      <h4 class="text-d2r-accent text-sm font-semibold mb-2">{{ t('runewords.level') }}</h4>
      <div class="flex items-center gap-2 text-sm text-d2r-muted">
        <span>Lv.{{ modelValue.levelRange[0] }}</span>
        <input
          type="range"
          :min="1"
          :max="99"
          :value="modelValue.levelRange[1]"
          class="flex-1 accent-d2r-primary"
          @input="emit('update:modelValue', { ...modelValue, levelRange: [modelValue.levelRange[0], Number(($event.target as HTMLInputElement).value)] as [number, number] })"
        />
        <span>Lv.{{ modelValue.levelRange[1] }}</span>
      </div>
    </div>

    <div>
      <h4 class="text-d2r-accent text-sm font-semibold mb-2">{{ t('runewords.ladderOnly') }}</h4>
      <div class="flex gap-2">
        <button
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="modelValue.ladderOnly === null ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border'"
          @click="emit('update:modelValue', { ...modelValue, ladderOnly: null })"
        >
          {{ t('common.all') }}
        </button>
        <button
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="modelValue.ladderOnly === true ? 'bg-d2r-danger text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border'"
          @click="emit('update:modelValue', { ...modelValue, ladderOnly: true })"
        >
          {{ t('common.ladder') }}
        </button>
        <button
          class="px-3 py-1 rounded text-sm cursor-pointer transition-colors"
          :class="modelValue.ladderOnly === false ? 'bg-d2r-primary text-white' : 'bg-d2r-card text-d2r-muted border border-d2r-border'"
          @click="emit('update:modelValue', { ...modelValue, ladderOnly: false })"
        >
          {{ t('common.nonLadder') }}
        </button>
      </div>
    </div>

    <button
      class="w-full py-2 rounded text-sm text-d2r-muted border border-d2r-border hover:border-d2r-danger hover:text-d2r-danger transition-colors cursor-pointer"
      @click="emit('update:modelValue', { sockets: [], itemTypes: [], levelRange: [1, 99], ladderOnly: null, classFilter: '', search: modelValue.search, sort: modelValue.sort })"
    >
      {{ t('common.clear') }}
    </button>
  </div>
</template>
