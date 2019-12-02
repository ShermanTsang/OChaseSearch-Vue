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
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      this.requestEngineList()
    },
    methods: {
      async requestEngineList() {
        const {data: engineList} = await this.$axios.get(this.$apiUrl('/engines'), {params: {}})
        this.$store.commit('SET_ENGINE_LIST',engineList)
      },
    }
  }
</script>
