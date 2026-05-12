<script setup lang="ts">
const props = defineProps<{
  name: string
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClass = computed(() => {
  switch (props.size || 'md') {
    case 'sm': return 'w-5 h-5 text-[10px]'
    case 'md': return 'w-8 h-8 text-xs'
    case 'lg': return 'w-12 h-12 text-sm'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-sm bg-d2r-card border border-d2r-accent/30 text-d2r-accent font-bold"
    :class="sizeClass"
    :title="name"
  >
    {{ name.slice(0, 2) }}
  </span>
</template>
