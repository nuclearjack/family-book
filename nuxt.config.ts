// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxt/eslint',
    'naive-ui-nuxt',
    'nuxt-auth-utils'
  ],
  dir: {
    pages: 'src/pages',
    layouts: 'src/app/layouts',
    middleware: 'src/app/middleware',
    plugins: 'src/app/plugins'
  },
  alias: {
    '@app': '/src/app',
    '@pages': '/src/pages',
    '@widgets': '/src/widgets',
    '@features': '/src/features',
    '@entities': '/src/entities',
    '@shared': '/src/shared'
  },
  css: ['~/src/shared/style/tailwind.css', '~/src/shared/style/style.css'],
  nitro: {
    externals: {
      external: ['formidable']
    }
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui']
    },
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    authUtils: {
      session: {
        expiryInSeconds: 60 * 60 * 24,
        cookieName: 'auth_session',
        cookie: {
          secure: process.env.NODE_ENV === 'production'
        }
      }
    }
  }
})
