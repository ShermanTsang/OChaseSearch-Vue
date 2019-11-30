<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow: hidden;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>
