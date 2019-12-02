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
                    opacity: .6;
                    width: 100%;
                    height: 100%;
                    transition: opacity .2s ease-in-out;

                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }

                    &:hover {
                        opacity: 1;
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
            <SearchBox @on-search="loadSearchResult"></SearchBox>
        </SearchHeader>
        <div class="page__main">
            <template v-if="status.activeEngineList">
            <div v-for="item in status.activeEngineList" :key="item.slug" class="page__main__web">
                <Loading v-if="item.isLoading" :fix="true">
                    {{ item.name }}加载中...
                </Loading>
                <div class="page__main__web__iframe">
                    <iframe :id="`iframe-${item.slug}`" :src="getSearchEngineUrl(item.url)" allowtransparency></iframe>
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
  export default {
    name: 'Search',
    data() {
      return {
        data: {
          engineList: []
        },
        status: {
          activeEngineList: [],
          isLoading: {}
        }
      }
    },
    computed: {
    },
    mounted() {
      this.requestEngineList()
      this.loadSearchResult()
    },
    methods: {
      getSearchEngineUrl(url) {
        return url.replace(new RegExp('%s'), this.$route.query.keyword)
      },
      setActiveEngine() {
        if (!window.localStorage.getItem('search/activeEngine')) {
          this.status.activeEngineList = this.data.engineList.filter((item) => {
            return ['bing', 'baidu'].includes(item.slug)
          })
        }
      },
      loadSearchResult() {
        setTimeout(() => {
          this.status.activeEngineList.forEach((item) => {
            this.$set(item, 'isLoading', true)
            this.onIframeLoad(item)
          })
        }, 0)
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
      async requestEngineList() {
        const {data: engineList} = await this.$axios.get(this.$apiUrl('/engines'), {params: {}})
        this.data.engineList = engineList
        this.setActiveEngine()
        this.loadSearchResult()
      },
    }
  }
</script>
