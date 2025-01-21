import path from 'path'
import { createPage, get, setupTest } from '@nuxt/test-utils'

describe('module tests', () => {
  setupTest({
    rootDir: path.resolve(__dirname, '../playground/'),
    browser: true,
    config: {
      yandexMetrika: {
        id: '49439650',
        noscript: true,
        initParams: {
          defer: false,
          clickmap: false,
          trackLinks: true,
          accurateTrackBounce: false,
          webvisor: false,
          ecommerce: false,
        },
      },
    },
  })

  it('script tag is injected with propper arguments', async () => {
    const page = await get('/')
    expect(page.body).toContain('ym("49439650", "init", {"defer":false,"clickmap":false,"trackLinks":true,"accurateTrackBounce":false,"webvisor":false,"ecommerce":false});')
  })

  it('goal is reached and page hit after navigation is worked', async () => {
    const page = await createPage('/?_ym_debug=1')
    const logs: string[] = []
    page.on('console', msg => logs.push(msg.text()))

    await page.waitForEvent('console')
    await page.waitForEvent('console')
    await page.waitForEvent('console')
    await page.waitForEvent('console')


    expect(logs).toContain(`PageView. Counter 49439650. URL: ${page.url()}. Referrer: `)
    expect(logs).toContain('Form goal. Counter 49439650. Init.')
    expect(logs).toContain(`PageView. Counter 49439650. URL: /?_ym_debug=1. Referrer: `)
    expect(logs).toContain('Reach goal. Counter: 49439650. Goal id: zzz')


    const toAPage = page.waitForEvent('console')
    await page.click('#a')
    await toAPage
    expect(logs[4]).toEqual('PageView. Counter 49439650. URL: /a. Referrer: /?_ym_debug=1')

    const toBPage = page.waitForEvent('console')
    await page.click('#b')
    await toBPage
    expect(logs[5]).toEqual('PageView. Counter 49439650. URL: /b. Referrer: /a')
  })
})
