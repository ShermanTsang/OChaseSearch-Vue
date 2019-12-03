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
        </SearchHeader>
        <div class="page__main">
            <template v-if="activeEngineList && activeEngineList.length > 0">
                <div v-for="item in activeEngineList" :key="item.slug" class="page__main__web">
                    <Loading v-if="item.isLoading" :fix="true">
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
  import SearchEngineMenu from '../components/SearchEngineMenu'

  export default {
    name: 'Search',
    components: {SearchEngineMenu},
    data() {
      return {
        status: {
          isLoading: {}
        }
      }
    },
    computed: {
      activeEngineList() {
        let activeEngineList = this.$store.getters.activeEngineList
        if (!activeEngineList || activeEngineList.length === 0) {
          activeEngineList = this.engineList.filter((item) => {
            return ['bing', 'baidu'].includes(item.slug)
          })
          this.$store.commit('SET_ACTIVE_ENGINE_LIST', activeEngineList)
        }
        return activeEngineList
      },
      ...mapGetters(['engineList'])
    },
    mounted() {
      this.loadSearchResult()
    },
    methods: {
      getSearchEngineUrl(url) {
        return url.replace(new RegExp('%s'), this.$route.query.keyword)
      },
      loadSearchResult() {
        this.activeEngineList.forEach((item) => {
          this.$set(item, 'isLoading', true)
          this.onIframeLoad(item)
        })
      },
      onIframeLoad(iframeItem) {
        const iframe = document.getElementById(`iframe-${iframeItem.slug}`)
        if (iframe.attachEvent) {
          // FOR IE
          iframe.attachEvent('onload', () => {
            this.$set(iframeItem, 'isLoading', false)
          })
        } else {
          iframe.onload = () => {
            this.$set(iframeItem, 'isLoading', false)
          }
        }
      },
    }
  }
</script>
