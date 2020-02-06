<style lang="scss" scoped>
    .page {

        &__main {
            display: grid;
            grid-column-gap: 0;
            padding-top: 64px;
            height: 100vh;

            &__header {
            }

            &__web {
                position: relative;
                width: 100%;
                margin-left: -1px;
                margin-top: -1px;
                border: 1px solid #eee;

                &__iframe {
                    position: relative;
                    opacity: .6;
                    width: 100%;
                    height: 100%;
                    transition: opacity .1s ease-in-out;

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
                        border-left: 1px solid #efefef;
                        background-color: rgba(255, 255, 255, .8);
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

                        &__right {
                            float: right;
                            color: #999;
                            font-size: .8rem;
                            letter-spacing: 1px;
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
            <SearchBox :autoFocus="false" @on-search="loadIframe"/>
            <div slot="action">
                <Icon name="setting" cursor="pointer" color="#999" size="1.4rem"
                      @click="status.showEngineMenu = true" />
            </div>
        </SearchHeader>
        <div class="page__main" :style="gridStyle">
            <template v-if="activeEngineList && activeEngineList.length > 0">
                <div v-for="number in (modeCol * modeRow)" :key="number" class="page__main__web">
                    <Loading v-if="status.isIframeLoading[getEngineItem(number).slug]" :fix="true">
                        {{ getEngineItem(number).name }}加载中...
                    </Loading>
                    <div class="page__main__web__iframe">
                        <iframe v-if="getEngineItem(number).url" :id="`iframe-${getEngineItem(number).slug}`" :src="getSearchEngineUrl(getEngineItem(number).url)"
                                allowtransparency></iframe>
                    </div>
                    <div class="page__main__web__toolbar">
                        <div class="page__main__web__toolbar__info">
                            <template v-if="getEngineItem(number).slug">
                                <span>{{ getEngineItem(number).category.name}} /</span> {{ getEngineItem(number).name }}
                                <span v-if="!status.isIframeLoading[getEngineItem(number).slug]"
                                      class="page__main__web__toolbar__info__right">{{status.iframeLoadingTime[getEngineItem(number).slug] | second}}秒加载</span>
                            </template>
                            <template v-else>
                                未设定
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <Modal v-model="status.showEngineMenu" title="设置" icon="setting" contentPadding="0">
            <SettingLayout activeTab="engine" />
        </Modal>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import queries from '@/graphql/queries'

  export default {
    name: 'Search',
    filters: {
      second(value) {
        return (value / 1000).toFixed(2)
      }
    },
    data() {
      return {
        status: {
          showEngineMenu: false,
          isIframeLoading: {},
          iframeLoadingTime: {}
        }
      }
    },
    computed: {
      gridStyle() {
        return {
          'grid-template-columns': `repeat(${this.modeCol}, 1fr)`,
          'grid-template-rows': `repeat(${this.modeRow}, 1fr)`
        }
      },
      ...mapGetters(['modeCol', 'modeRow', 'engineList', 'activeEngineList', 'pullEngineListTime'])
    },
    watch: {
      activeEngineList(oldVal, newVal) {
        const newSlugArray = newVal.map(item => item.slug)
        const diffEngineList = oldVal.filter(item => !newSlugArray.includes(item.slug))
        this.loadIframe(diffEngineList)
      }
    },
    mounted() {
      this.requestEngineList()
      this.storeHistoryKeyword()
    },
    methods: {
      storeHistoryKeyword() {
        this.$store.commit('ADD_HISTORY_KEYWORD', this.$route.query.keyword)
      },
      async requestEngineList() {
        if (!this.pullEngineListTime || !this.engineList || this.engineList.length === 0) {
          const {data: {engineList}} = await this.$apollo.query({query: queries.engineList})
          this.$store.commit('SET_ENGINE_LIST', engineList)
          this.$store.commit('SET_PULL_ENGINE_LIST_TIME', this.$time().format('YYYY-MM-DD HH:mm:ss'))
        }
        this.loadIframe()
      },
      getSearchEngineUrl(url) {
        return url.replace(new RegExp('%s'), this.$route.query.keyword)
      },
      getEngineItem(number) {
        return this.activeEngineList[number - 1] || {}
      },
      loadIframe(engineList = this.activeEngineList || []) {
        this.$nextTick(() => {
          for (const item of engineList) {
            if (item.url) {
              this.initIframeItem(item.slug)
            }
          }
        })
      },
      initIframeItem(slug) {
        this.$set(this.status.isIframeLoading, slug, true)
        this.$set(this.status.iframeLoadingTime, slug, this.$time().valueOf())

        const iframe = document.getElementById(`iframe-${slug}`)
        if (iframe) {
          if (iframe.attachEvent) {
            // FOR IE
            iframe.attachEvent('onload', () => {
              this.$set(this.status.isIframeLoading, slug, false)
              const timeGap = this.$time().valueOf() - this.status.iframeLoadingTime[slug]
              this.$set(this.status.iframeLoadingTime, slug, timeGap)
            })
          } else {
            iframe.onload = () => {
              this.$set(this.status.isIframeLoading, slug, false)
              const timeGap = this.$time().valueOf() - this.status.iframeLoadingTime[slug]
              this.$set(this.status.iframeLoadingTime, slug, timeGap)
            }
          }
        }
      },
    }
  }
</script>
