<style lang="scss" scoped>
    #app {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        overflow: hidden;
    }
</style>

<template>
    <div id="app" :data-theme="themeColor">
        <router-view />
    </div>
</template>

<script>
  import 'normalize.css'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['themeColor'])
    },
    mounted() {
    },
    methods: {}
  }
</script>
