import type { MetrikaModuleParams } from '../type'

export default (ctx: any, inject: any) => {
  // eslint-disable-next-line @typescript-eslint/quotes
  const options: MetrikaModuleParams = JSON.parse(`<%= JSON.stringify(options) %>`)

  ctx.app.router?.afterEach((to: any, from: any) => {
    window.ym(options.id, 'hit', to.fullPath, {
      referer: from.fullPath,
    })
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
