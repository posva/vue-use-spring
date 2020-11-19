<template>
  <div>
    <ul>
      <li
        v-for="route in $router.getRoutes().filter((r) => r.path != '/')"
        :key="route.path"
      >
        <router-link :to="route.path">{{ route.path }}</router-link>
      </li>
    </ul>
  </div>
</template>
