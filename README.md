# vue-use-spring [![NPM version](https://img.shields.io/npm/v/vue-use-spring?color=black&label=)](https://www.npmjs.com/package/vue-use-spring) [![ci status](https://github.com/posva/vue-use-spring/actions/workflows/ci.yml/badge.svg)](https://github.com/posva/vue-use-spring/actions/workflows/ci.yml)

> 💫 Make natural animations with springs!

## Installation

```sh
yarn add vue-use-spring
# or
npm install vue-use-spring
```

## Usage

```js
import { useSpring } from 'vue-use-spring'

const position = useSpring({ x: 0, y: 0 })

// change position like you would usually
position.x = 100
```

```vue
<p :style="{ transform: `translateX(${position.x}px)` }">I move!</p>
```

## API

## Related

## License

[MIT](http://opensource.org/licenses/MIT)
