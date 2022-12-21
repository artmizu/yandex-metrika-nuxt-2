![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/artmizu/yandex-metrika-nuxt-2/release.yml?branch=main&style=plastic)

# 🕵️ Yandex Metrika for Nuxt 2

## Features
* Types via Typescript
* Prints handy mesages in a dev mode, when certain goals is reached
* Expose useful methods to the nuxt app instance
* Fully customizable via runtime config

## Installation
Install package via a package manager:
```bash
# using npm
npm install @artmizu/yandex-metrika-nuxt-2

# using yarm
yarn add @artmizu/yandex-metrika-nuxt-2

# using pnpm
pnpm add @artmizu/yandex-metrika-nuxt-2
```

Add it to a modules section of your nuxt config:
```js
export default {
  buildModules: ['@artmizu/yandex-metrika-nuxt-2']
}
```

## Options
You can pass it through module options and the nuxt config property `yandexMetrika`.

## How to use
From the nuxt context, you can use:
```javascript
// on goals
this.$metrika.reachGoal('goal-name')

// on page hit
this.$metrika.hit('/path/to/page')
```

### initParams
- Description: parameters are sent directly to yandex metrika [init function](https://yandex.ru/support/metrica/code/counter-initialize.html)
- Type: `boolean`
- Default:
```
{
  defer: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  ecommerce: true,
}
```

### verbose
- Description: handy messages about navigation and metrics goals
- Type: `boolean`
- Default: `true`

### noscript
- Type: `boolean`
- Default: `true`

### useCDN
- Type: `boolean`
- Default: `false`