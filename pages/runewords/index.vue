<script setup lang="ts">
const { runewords, load } = useRunewords()
const { filter, apply } = useFilter()
const { t } = useI18n()

await load()

const filtered = computed(() => apply(runewords.value))
const showMobileFilter = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-heading text-d2r-accent mb-2">{{ t('runewords.title') }}</h1>
      <p class="text-d2r-muted">{{ t('runewords.subtitle', { count: runewords.length }) }}</p>
    </div>

    <div class="flex items-center gap-4 mb-6">
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
      <button
        class="md:hidden px-3 py-2 bg-d2r-card border border-d2r-border rounded text-d2r-muted text-sm cursor-pointer"
        @click="showMobileFilter = !showMobileFilter"
      >
        {{ t('runewords.filter') }}
      </button>
    </div>

    <div class="flex gap-8">
      <aside class="hidden md:block w-64 flex-shrink-0">
        <div class="sticky top-24">
          <ItemFilter v-model="filter" />
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="filtered.length === 0" class="text-center py-12 text-d2r-muted">
          {{ t('runewords.noResults') }}
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RunewordCard
            v-for="rw in filtered"
            :key="rw.slug"
            :runeword="rw"
          />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showMobileFilter"
        class="fixed inset-0 z-50 md:hidden"
        @click.self="showMobileFilter = false"
      >
        <div class="absolute inset-x-0 bottom-0 bg-d2r-bg-alt border-t border-d2r-border rounded-t-xl p-6 max-h-[70vh] overflow-y-auto">
          <ItemFilter v-model="filter" />
          <button
            class="w-full mt-4 py-2 bg-d2r-primary text-white rounded cursor-pointer"
            @click="showMobileFilter = false"
          >
            {{ t('common.done') }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
