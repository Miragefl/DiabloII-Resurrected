<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()
const localePath = useLocalePath()

const availableLocales = computed(() =>
  locales.value.filter((l: any) => l.code !== locale.value),
)

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-d2r-border bg-d2r-bg-alt/95 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2 no-underline">
          <span class="text-d2r-accent font-heading text-xl font-bold">D2R</span>
          <span class="hidden sm:inline text-d2r-muted text-sm">Runewords</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink :to="localePath('/')" class="text-d2r-text hover:text-d2r-primary transition-colors no-underline">
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/runewords')" class="text-d2r-text hover:text-d2r-primary transition-colors no-underline">
            {{ t('nav.runewords') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/runes')" class="text-d2r-text hover:text-d2r-primary transition-colors no-underline">
            {{ t('nav.runes') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/base-items')" class="text-d2r-text hover:text-d2r-primary transition-colors no-underline">
            {{ t('nav.baseItems') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/crafted')" class="text-d2r-text hover:text-d2r-primary transition-colors no-underline">
            {{ t('nav.crafted') }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="text-d2r-muted hover:text-d2r-accent text-sm font-medium transition-colors cursor-pointer"
            @click="setLocale(loc.code)"
          >
            {{ loc.name }}
          </button>

          <button
            class="md:hidden text-d2r-text cursor-pointer"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden border-t border-d2r-border py-3 space-y-2">
        <NuxtLink :to="localePath('/')" class="block px-2 py-1 text-d2r-text hover:text-d2r-primary no-underline" @click="mobileMenuOpen = false">
          {{ t('nav.home') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/runewords')" class="block px-2 py-1 text-d2r-text hover:text-d2r-primary no-underline" @click="mobileMenuOpen = false">
          {{ t('nav.runewords') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/runes')" class="block px-2 py-1 text-d2r-text hover:text-d2r-primary no-underline" @click="mobileMenuOpen = false">
          {{ t('nav.runes') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/base-items')" class="block px-2 py-1 text-d2r-text hover:text-d2r-primary no-underline" @click="mobileMenuOpen = false">
          {{ t('nav.baseItems') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/crafted')" class="block px-2 py-1 text-d2r-text hover:text-d2r-primary no-underline" @click="mobileMenuOpen = false">
          {{ t('nav.crafted') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
