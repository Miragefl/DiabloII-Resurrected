<script setup lang="ts">
defineProps<{
  runeName: string
  runeNumber: number
  weaponEffect?: string
  armorEffect?: string
  shieldEffect?: string
}>()
</script>

<template>
  <div class="px-3 py-2 bg-d2r-card border border-d2r-border rounded">
    <div class="flex items-center gap-2">
      <span class="text-d2r-accent font-bold text-lg w-8 text-center">#{{ runeNumber }}</span>
      <div class="w-px h-6 bg-d2r-border" />
      <RuneIcon :name="runeName" size="sm" />
      <span class="text-d2r-text font-medium">{{ runeName }}</span>
    </div>
    <div v-if="weaponEffect || armorEffect || shieldEffect" class="mt-2 ml-10 grid grid-cols-1 sm:grid-cols-3 gap-1 text-xs text-d2r-muted">
      <div v-if="weaponEffect"><span class="text-d2r-accent">⚔</span> {{ weaponEffect }}</div>
      <div v-if="armorEffect"><span class="text-d2r-accent">🛡</span> {{ armorEffect }}</div>
      <div v-if="shieldEffect"><span class="text-d2r-accent">🔰</span> {{ shieldEffect }}</div>
    </div>
  </div>
</template>
