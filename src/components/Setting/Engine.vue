<style lang="scss" scoped>
    .engine {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;

        &__main {
            padding: 0 10px;
            width: 75%;

            &__list {
                display: flex;
                flex-flow: row wrap;
                width: 100%;
            }
        }

        &__layout {
            padding: 0 10px;
            width: 25%;
        }

    }
</style>

<template>
    <div class="engine">
        <div class="engine__main">
            <Nameplate>
                搜索引擎
                <div slot="action">
                    上次拉取{{pullEngineListTime.toString()}} <Btn fontSize="0.9rem" @click="updateEngineList">更新</Btn>
                </div>
            </Nameplate>
            <div class="engine__main__list">
                <SearchEngineCard v-for="item in engineList" :key="item.id" :item="item" />
            </div>
        </div>
        <div class="engine__layout">
            <Nameplate>搜索模式</Nameplate>
            <SearchMode />
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import queries from '@/graphql/queries'

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
      ...mapGetters(['pullEngineListTime']),
      ...mapState(['activeEngineList'])
    },
    methods: {
      async updateEngineList() {
        const {data: {engineList}} = await this.$apollo.query({query: queries.engineList})
        this.$store.commit('SET_ENGINE_LIST', engineList)
        this.$store.commit('SET_PULL_ENGINE_LIST_TIME', this.$time().format('YYYY-MM-DD HH:mm:ss'))
      }
    }
  }
</script>
