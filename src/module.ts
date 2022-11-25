import path from 'path'
import type { Module } from '@nuxt/types'
import type { PartialDeep } from 'type-fest'
import merge from 'lodash.merge'
import consola from 'consola'
import type { Metrika, MetrikaModuleParams } from './type'

const module: Module<Partial<MetrikaModuleParams>> = function (moduleOptions) {
  const option = merge(
    {
      noscript: true,
      useCDN: false,
      verbose: true,
      initParams: {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: true,
      },
    },
    this.options.yandexMetrika,
    moduleOptions,
  )

  if (!this.options.dev || process.env.NODE_ENV === 'production') {
    if (!isValid(option)) {
      consola.error('[yandex.metrika] module cannot be initialized, please specify ID')
      return
    }

    consola.success('[yandex.metrika] initialized')

    if (typeof this.options.head === 'object') {
      this.options.head.__dangerouslyDisableSanitizersByTagID = this.options.head.__dangerouslyDisableSanitizersByTagID || {}
      this.options.head.__dangerouslyDisableSanitizersByTagID.metrika = ['innerHTML']
      this.options.head.script = this.options.head.script || []
      this.options.head.script.unshift({
        hid: 'metrika',
        innerHTML: getScriptTag(option),
      })

      if (option.noscript) {
        this.options.head.__dangerouslyDisableSanitizers = ['noscript']
        this.options.head.noscript = this.options.head.noscript || []
        this.options.head.noscript.unshift({
          innerHTML: getNoscript(option.id),
        })
      }

      this.addPlugin({
        src: path.resolve(__dirname, './runtime/plugin.mjs'),
        mode: 'client',
        options: option,
      })
    }
  }
  else if (option.verbose === true) {
    this.addPlugin({
      src: path.resolve(__dirname, './runtime/plugin-dev.mjs'),
      mode: 'client',
      options: option,
    })
  }
}

function isValid(options: Partial<MetrikaModuleParams>): options is MetrikaModuleParams {
  return !!options.id
}

function getScriptTag(options: MetrikaModuleParams) {
  const libURL = !options.useCDN ? 'https://mc.yandex.ru/metrika/tag.js' : 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  const metrikaContent = `
    (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${libURL}", "ym");
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}

declare global {
  interface Window {
    ym: (id: string, action: string, value: string, opts?: { referer: string }) => void
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $metrika: Metrika
  }
}

declare module '@nuxt/types' {
  interface Context {
    $metrika: Metrika
  }

  interface NuxtAppOptions {
    $metrika: Metrika
  }

  interface NuxtOptions {
    yandexMetrika?: PartialDeep<MetrikaModuleParams>
  }
}

export default module
