<script setup lang="ts">
defineProps<{
  effects: string[]
}>()
</script>

<template>
  <ul class="space-y-1">
    <li
      v-for="(effect, idx) in effects"
      :key="idx"
      class="text-sm text-d2r-text flex items-start gap-2"
    >
      <span class="text-d2r-accent mt-0.5">&#9670;</span>
      <span>{{ effect }}</span>
    </li>
  </ul>
</template>
