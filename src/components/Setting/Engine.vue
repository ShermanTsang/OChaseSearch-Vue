<style lang="scss" scoped>
    .engine {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;

        &__main {
            width: 75%;

            &__list {
                display: flex;
                flex-flow: row wrap;
                width: 100%;
            }
        }

        &__layout {
            width: 25%;
        }

    }
</style>

<template>
    <div class="engine">
        <div class="engine__main">
            <Nameplate>搜索引擎列表</Nameplate>
            <div class="engine__main__list">
                <SearchEngineItem v-for="item in engineList" :id="item.slug" :key="item.id" :item="item" />
            </div>
        </div>
        <div class="engine__layout">
            <Nameplate>搜索模式</Nameplate>
            <SearchMode />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SettingEngine',
    props: {},
    data() {
      return {}
    },
    computed: {
      engineList: {
        get() {
          return this.$store.getters.engineList
        },
        set(value) {
          this.$store.commit('SET_ENGINE_LIST', value)
        }
      }
    },
    methods: {}
  }
</script>
