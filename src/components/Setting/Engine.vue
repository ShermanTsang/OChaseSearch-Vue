<style lang="scss" scoped>
.setting-engine {
  position: relative;

  &__block {
    color: #666;
    font-size: .95rem;
    margin-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

}
</style>

<template>
  <LayoutRow class="setting-engine">
    <Loading v-if="state.isPullingEngineList" :fix="true">
      {{ $t('setting.isPullingEngineList') }}
    </Loading>
    <template v-esle>
      <LayoutCol :xs="{span:24}" :sm="{span:24}" :md="{span:16}" :lg="{span:18}" :xl="{span:18}">
        <div class="setting-engine__block">
          <Nameplate>
            {{ $t('setting.dataSource') }}
          </Nameplate>
          <SettingItem :name="$t('setting.updateData')">
            当前有 {{ engineList ? engineList.length : 0 }} 条数据
            <br>
            上次拉取于 {{ pullEngineListTime }}
            <div slot="action">
              <Btn fontSize="0.9rem" @click="updateEngineList">
                <Icon name="Download" />
                更新
              </Btn>
            </div>
          </SettingItem>
        </div>
        <div class="setting-engine__block">
          <Nameplate>
            列表
          </Nameplate>
          <div class="setting-engine__list">
            <SearchEngineCard v-for="item in oddEngineList" :key="item.id" :item="item" />
          </div>
        </div>
      </LayoutCol>
      <LayoutCol :xs="{span:24}" :sm="{span:24}" :md="{span:8}" :lg="{span:6}" :xl="{span:6}">
        <Nameplate>布局</Nameplate>
        <SearchMode />
      </LayoutCol>
    </template>
  </LayoutRow>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import queries from '@/graphql/queries'

  export default {
    name: 'SettingEngine',
    props: {},
    data() {
      return {
        state: {
          isPullingEngineList: false
        }
      }
    },
    computed: {
      oddEngineList() {
        return this.engineList.filter(engineItem => !this.activeEngineList.includes(engineItem.slug))
      },
      ...mapGetters(['pullEngineListTime', 'engineList']),
      ...mapState(['activeEngineList'])
    },
    methods: {
      async updateEngineList() {
        this.state.isPullingEngineList = true
        const {data: {engineList}} = await this.$apollo.query({query: queries.engineList})
        this.$store.commit('SET_ENGINE_LIST', engineList)
        this.$store.commit('SET_PULL_ENGINE_LIST_TIME', this.$time().format('YYYY-MM-DD HH:mm:ss'))
        this.$toast.success('搜索引擎库已更新')
        this.state.isPullingEngineList = false
      }
    }
  }
</script>
