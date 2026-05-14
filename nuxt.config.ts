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
      title: 'D2R Runewords - Diablo II Resurrected Runewords, Runes & Base Items Database',
      meta: [
        { name: 'description', content: 'Complete Diablo II Resurrected runewords database. Browse all runewords, runes, and base items with stats, effects, and crafting guides. 暗黑2重置版符文之语数据库。' },
        { name: 'keywords', content: 'Diablo 2 Resurrected, D2R, Runewords, Runes, Base Items, 符文之语, 暗黑破坏神2, 暗黑2重置版, 符文, 底材' },
        { property: 'og:title', content: 'D2R Runewords - Diablo II Resurrected Database' },
        { property: 'og:description', content: 'Complete D2R runewords, runes & base items database with stats and crafting guides.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://d2r-runewords.vercel.app' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'D2R Runewords Database' },
        { name: 'twitter:description', content: 'Complete Diablo II Resurrected runewords, runes & base items database.' },
        { name: 'google-site-verification', content: 'oTiBcT617XB2bNV3wl5anTiHnGrkx1BwbKTNfVj6XV8' },
      ],
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'canonical', href: 'https://d2r-runewords.vercel.app' },
      ],
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

  sitemap: {
    xsl: false,
  },

  devtools: { enabled: false },
})
