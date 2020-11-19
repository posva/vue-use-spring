<template>
  <div class="main">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
