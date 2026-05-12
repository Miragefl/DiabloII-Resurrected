<script setup lang="ts">
defineProps<{
  runeName: string
  runeNumber: number
}>()
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-2 bg-d2r-card border border-d2r-border rounded">
    <span class="text-d2r-accent font-bold text-lg w-8 text-center">#{{ runeNumber }}</span>
    <div class="w-px h-6 bg-d2r-border" />
    <RuneIcon :name="runeName" size="sm" />
    <span class="text-d2r-text font-medium">{{ runeName }}</span>
  </div>
</template>
