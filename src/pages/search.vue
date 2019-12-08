<style lang="scss">
    .page {

        &__main {
            display: flex;
            flex-flow: row nowrap;
            padding-top: 64px;
            height: 100vh;

            &__web {
                position: relative;
                width: 100%;
                flex-grow: 1;

                &__iframe {
                    position: relative;
                    opacity: .6;
                    width: 100%;
                    height: 100%;
                    transition: opacity .1s ease-in-out;
                    border: 1px solid #eee;

                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }

                    &:hover {
                        opacity: 1;
                    }

                    &:before {
                        position: absolute;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        content: '';
                        height: 100%;
                        width: 18px;
                        background-color: rgba(255, 255, 255, .8);
                        box-shadow: -2px 0 6px rgba(177, 177, 177, .5);
                    }

                }

                &__toolbar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    padding: 10px 16px;
                    background-color: rgba(255, 255, 255, .95);
                    box-shadow: 0 -2px 4px rgba(177, 177, 177, .2);
                    letter-spacing: 2px;

                    &__info {
                        font-size: .9rem;
                        color: #666;

                        span {
                            font-size: .85rem;
                            color: #999;
                        }
                    }
                }

            }

        }
    }
</style>

<template>
    <div class="page">
        <SearchHeader class="page__header">
            <SearchBox @on-search="loadSearchResult" />
            <div slot="action">
                <Icon name="setting" color="#999" size="1.4rem" @click="status.showEngineMenu = true"/>
            </div>
        </SearchHeader>
        <Modal v-model="status.showEngineMenu" title="设置" icon="setting" contentPadding="0">
            <SettingIndex activeTab="engine"/>
        </Modal>
        <div class="page__main">
            <template v-if="activeEngineList && activeEngineList.length > 0">
                <div v-for="item in activeEngineList" :key="item.slug" class="page__main__web">
                    <Loading v-if="status.isIframeLoading[item.slug]" :fix="true">
                        {{ item.name }}加载中...
                    </Loading>
                    <div class="page__main__web__iframe">
                        <iframe :id="`iframe-${item.slug}`" :src="getSearchEngineUrl(item.url)"
                                allowtransparency></iframe>
                    </div>
                    <div class="page__main__web__toolbar">
                        <div class="page__main__web__toolbar__info">
                            <span>{{ item.category }} /</span> {{ item.name }}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Search',
    data() {
      return {
        status: {
          showEngineMenu: false,
          isIframeLoading: {}
        }
      }
    },
    computed: {
      activeEngineList() {
        let activeEngine = this.$store.getters.activeEngine
        if (!activeEngine || activeEngine.length === 0) {
          activeEngine = ['baidu','doge']
          this.$store.commit('SET_ACTIVE_ENGINE', activeEngine)
        }
        const activeEngineWithData = this.engineList.filter(item => ['baidu','doge'].includes(item.slug))
        activeEngineWithData.sort((a, b) => activeEngine.indexOf(a.slug) - activeEngine.indexOf(b.slug))
        return activeEngineWithData
      },
      ...mapGetters(['engineList', 'pullEngineListTime'])
    },
    mounted() {
      this.requestEngineList()
      this.loadSearchResult()
    },
    methods: {
      async requestEngineList() {
        if (!this.pullEngineListTime || !this.engineList || this.engineList.length === 0) {
          const {data: engineList} = await this.$axios.get(this.$apiUrl('/engines'), {params: {}})
          this.$store.commit('SET_ENGINE_LIST', engineList)
          this.$store.commit('SET_PULL_ENGINE_LIST_TIME', this.$time().format('YYYY-MM-DD HH:mm:ss'))
        }
      },
      getSearchEngineUrl(url) {
        return url.replace(new RegExp('%s'), this.$route.query.keyword)
      },
      loadSearchResult() {
        this.activeEngineList.forEach((item) => {
          this.$set(this.status.isIframeLoading, item.slug, true)
          this.onIframeLoad(item)
        })
      },
      onIframeLoad(iframeItem) {
        const iframe = document.getElementById(`iframe-${iframeItem.slug}`)
        if (iframe.attachEvent) {
          // FOR IE
          iframe.attachEvent('onload', () => {
            this.$set(this.status.isIframeLoading, iframeItem.slug, false)
          })
        } else {
          iframe.onload = () => {
            this.$set(this.status.isIframeLoading, iframeItem.slug, false)
          }
        }
      },
    }
  }
</script>
