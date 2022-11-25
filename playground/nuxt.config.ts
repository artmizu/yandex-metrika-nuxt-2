import type { NuxtConfig } from '@nuxt/types'
import MyModule from '../'

const config: NuxtConfig = {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  dev: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    MyModule,
  ],

  yandexMetrika: {
    id: '49439650',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}

export default config
