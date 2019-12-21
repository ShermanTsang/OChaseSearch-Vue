<style lang="scss">
    .page {

        &__main {
            display: grid;
            grid-column-gap: 0;
            padding-top: 64px;
            height: 100vh;

            &__web {
                position: relative;
                width: 100%;
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
                <Icon name="setting" cursor="pointer" color="#999" size="1.4rem"
                      @click="status.showEngineMenu = true" />
            </div>
        </SearchHeader>
        <Modal v-model="status.showEngineMenu" title="设置" icon="setting" contentPadding="0">
            <SettingIndex activeTab="engine" />
        </Modal>
        <div class="page__main" :style="gridStyle">
            <template v-if="activeEngineList && activeEngineList.length > 0">
                <div v-for="number in (modeCol * modeRow)" :key="number" class="page__main__web">
                    <Loading v-if="status.isIframeLoading[getEngineItem(number).slug]" :fix="true">
                        {{ getEngineItem(number).name }}加载中...
                    </Loading>
                    <div class="page__main__web__iframe">
                        <iframe v-if="getEngineItem(number).url" :id="`iframe-${getEngineItem(number).slug}`"
                                :src="getSearchEngineUrl(getEngineItem(number).url)" allowtransparency></iframe>
                    </div>
                    <div class="page__main__web__toolbar">
                        <div class="page__main__web__toolbar__info">
                            <template v-if="getEngineItem(number).slug">
                                <span>{{ getEngineItem(number).category }} /</span> {{ getEngineItem(number).name }}
                            </template>
                            <template v-else>
                                未设定
                            </template>
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
      gridStyle() {
        return {
          'grid-template-columns': `repeat(${this.modeCol}, 1fr)`,
          'grid-template-rows': `repeat(${this.modeRow}, 1fr)`
        }
      },
      ...mapGetters(['modeCol', 'modeRow', 'engineList', 'activeEngineList', 'pullEngineListTime'])
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
      getEngineItem(number) {
        return this.activeEngineList[number - 1] || {}
      },
      loadSearchResult() {
        this.activeEngineList.forEach(item => {
          if (item.url) {
            this.$set(this.status.isIframeLoading, item.slug, true)
            this.onIframeLoad(item)
          }
        })
      },
      onIframeLoad(iframeItem) {
        const iframe = document.getElementById(`iframe-${iframeItem.slug}`)
        if (iframe) {
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
        }
      },
    }
  }
</script>
