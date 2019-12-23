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
                <SearchEngineItem v-for="item in engineList" :key="item.id" :item="item" />
            </div>
        </div>
        <div class="engine__layout">
            <Nameplate>搜索模式</Nameplate>
            <SearchMode />
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'SettingEngine',
    props: {},
    data() {
      return {}
    },
    computed: {
      engineList() {
        return this.$store.getters.engineList.filter(engineItem => !this.activeEngineList.includes(engineItem.slug))
      },
      ...mapState(['activeEngineList'])
    },
    methods: {
    }
  }
</script>
