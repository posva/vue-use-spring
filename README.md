# vue-use-spring [![Build Status](https://badgen.net/circleci/github/posva/vue-use-spring/v2)](https://circleci.com/gh/posva/vue-use-spring) [![npm package](https://badgen.net/npm/v/vue-use-spring)](https://www.npmjs.com/package/vue-use-spring) [![coverage](https://badgen.net/codecov/c/github/posva/vue-use-spring/v2)](https://codecov.io/github/posva/vue-use-spring) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

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

```html
<p :style="{ transform: `translateX(${position.x}px)` }">I move!</p>
```

## API

## Related

## License

[MIT](http://opensource.org/licenses/MIT)

<div align="right">
<sub><em>
This project was created using the <a href="https://github.com/posva/vue-ts-lib-boilerplate" rel="nofollow">Vue Library boilerplate</a> by <a href="https://github.com/posva" rel="nofollow">posva</a>
</em></sub>
</div>
