import consola from 'consola'

export default (_: any, inject: any) => {
  inject('metrika', {
    reachGoal: (identifyer: string) => {
      consola.info(`[yandex.metrika] reach goal "${identifyer}" on dev`)
    },
    hit: (url: string) => {
      consola.info(`[yandex.metrika] hit on "${url}" on dev`)
    },
  })
}
