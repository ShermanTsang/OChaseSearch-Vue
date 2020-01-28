<style lang="scss" scoped>
    #app {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        overflow: hidden;
    }
</style>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
  import 'normalize.css'

  export default {
    name: 'app',
    mounted() {
    },
    methods: {}
  }
</script>
