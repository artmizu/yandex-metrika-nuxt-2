import type { Context } from '@nuxt/types'
import type { MetrikaModuleParams } from '../type'

export default (ctx: Context, inject: any) => {
  // eslint-disable-next-line @typescript-eslint/quotes
  const options: MetrikaModuleParams = JSON.parse(`<%= JSON.stringify(options) %>`)

  ctx.app.router?.afterEach((to) => {
    window.ym(options.id, 'hit', to.fullPath)
  })

  inject('metrika', {
    hit: (url: string) => {
      window.ym(options.id, 'hit', url)
    },
    reachGoal: (identifyer: string) => {
      window.ym(options.id, 'reachGoal', identifyer)
    },
  })
}
