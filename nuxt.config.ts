import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
    ],
    defaultLocale: 'en',
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  app: {
    head: {
      title: 'D2R Runewords',
      meta: [
        { name: 'description', content: 'Diablo II Resurrected Runewords, Runes & Base Items Database' },
      ],
      htmlAttrs: { lang: 'en' },
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  site: {
    url: 'https://d2r-runewords.vercel.app',
    name: 'D2R Runewords Database',
  },

  devtools: { enabled: false },
})
