<script setup lang="ts">
const props = defineProps<{
  name: string
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClass = computed(() => {
  switch (props.size || 'md') {
    case 'sm': return 'w-6 h-6'
    case 'md': return 'w-10 h-10'
    case 'lg': return 'w-16 h-16'
  }
})

const imgSize = computed(() => {
  switch (props.size || 'md') {
    case 'sm': return 24
    case 'md': return 40
    case 'lg': return 64
  }
})

const runeImage = computed(() => `/images/runes/${props.name.toLowerCase()}.png`)
</script>

<template>
  <img
    :src="runeImage"
    :alt="name"
    :width="imgSize"
    :height="imgSize"
    class="inline-block"
    :class="sizeClass"
    :title="name"
  />
</template>
