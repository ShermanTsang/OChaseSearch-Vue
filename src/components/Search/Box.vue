<style lang="scss" scoped>
    .search {
        position: relative;

        &__box {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border: 1px solid #dfe1e5;
            margin: 0 auto;
            transition: all .2s ease-in-out;
            border-radius: 24px;
            height: 44px;
            padding: 10px;

            &__input {
                padding: 0 16px;

                input {
                    font-size: 1rem;
                    border: none;
                    outline: none;
                    padding: 0;
                    margin: 0;
                    color: #999;
                    letter-spacing: 1px;
                    width: 340px;
                    max-width: 100%;
                    transition: all .2s ease-in-out;

                    &:focus {
                        color: #666;
                        width: 360px;
                    }
                }
            }

            &__button {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    height: 100%;
                    top: 0;
                    bottom: 0;
                    left: -12px;
                    width: 2px;
                    background-color: #efefef;
                }
            }

            &:hover {
                box-shadow: 0 1px 12px 0 rgba(32, 33, 36, 0.1);
            }
        }

        &__box--focused {
            border-radius: 24px 24px 0 0;
        }

        &__toolbox {
            position: absolute;
            left: 0;
            right: 0;
            background-color: #fff;
            border: 1px solid #dfe1e5;
            border-top-color: transparent;
            box-shadow: 0 1px 12px 0 rgba(32, 33, 36, 0.1);
            z-index: 1;

            &__tab {

                &__prompt {

                    &__item {
                        padding: 8px 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #666666;
                        font-size: .95rem;
                        transition: .2s ease-in-out;
                        cursor: pointer;

                        &:not(:first-child) {
                            border-top: 1px solid #efefef;
                        }

                        &:hover {
                            box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
                        }
                    }

                    &__item--active {
                        padding: 12px 16px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
                    }
                }

                &__history {
                    padding: 16px;
                    max-height: 300px;
                    overflow: auto;

                    &__item {
                        $border-radius: 24px;
                        position: relative;
                        border: 1px solid #ddd;
                        font-size: .9rem;
                        border-radius: $border-radius;
                        margin-bottom: 10px;
                        margin-right: 10px;
                        cursor: pointer;
                        display: inline-flex;
                        flex-flow: row nowrap;

                        &__text {
                            color: #666;
                            padding: 6px 10px;
                            white-space: nowrap;
                            border-top-left-radius: $border-radius;
                            border-bottom-left-radius: $border-radius;
                            transition: all .2s ease-in-out;
                        }

                        &__delete {
                            display: none;
                            position: absolute;
                            color: #ccc;
                            padding: 6px;
                            background-color: #fff;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            transition: all .2s ease-in-out;
                            border-top-right-radius: 24px;
                            border-bottom-right-radius: 24px;
                            box-shadow: -2px 0 6px rgba(177,177,177,.4);
                        }

                        &__delete--outer {
                            top: -1px;
                            bottom: -1px;
                            right: -20px;
                            border-top: 1px solid #ddd;
                            border-right: 1px solid #ddd;
                            border-bottom: 1px solid #ddd;
                            box-shadow: none;
                            z-index: 1;
                        }

                        &:hover {
                            box-shadow: 0 0 6px rgba(0,0,0,.1);

                            .search__toolbox__tab__history__item__delete {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="search">
        <div class="search__box" :class="{'search__box--focused':status.showToolbox || status.isMouseOnToolbox}">
            <div class="search__box__input">
                <input v-model="form.keyword" v-focus="autoFocus" type="text" placeholder=""
                       @keyup.enter="search()"
                       @keyup.down="selectItem('down')"
                       @keyup.up="selectItem('up')"
                       @blur="onInputBlur"
                       @focus="onInputFocus">
            </div>
            <div class="search__box__button">
                <Icon name="search" color="#aaa" size="1rem" />
            </div>
        </div>
        <div v-if="status.showToolbox || status.isMouseOnToolbox" class="search__toolbox"
             @mouseenter="status.isMouseOnToolbox = true"
             @mouseleave="status.isMouseOnToolbox = false"
        >
            <Tab :tabNames="['搜索建议','历史记录']" defaultTab="搜索建议" class="search__toolbox__tab"
                 @changeTab="(tabName)=>{status.activeTab = tabName}">
                <div slot="搜索建议">
                    <div v-if="data.promptKeywordList && data.promptKeywordList.length > 0"
                         class="search__toolbox__tab__prompt">
                        <div v-for="(keyword,index) in data.promptKeywordList" :key="keyword"
                             class="search__toolbox__tab__prompt__item"
                             :class="{'search__toolbox__tab__prompt__item--active': status.selectedPromptIndex === index}"
                             @click="search(keyword)"
                             v-html="highlightKeywordHtml(keyword)">
                        </div>
                    </div>
                    <Tip v-else>
                        暂无建议关键字
                    </Tip>
                </div>
                <div slot="历史记录">
                    <div v-if="historyKeywordList && historyKeywordList.length>0" class="search__toolbox__tab__history">
                        <div v-for="(keyword,index) in historyKeywordList" :key="index"
                             class="search__toolbox__tab__history__item">
                            <div class="search__toolbox__tab__history__item__text" @click="search(keyword)">
                                {{keyword}}
                            </div>
                            <div class="search__toolbox__tab__history__item__delete"
                                 :class="{'search__toolbox__tab__history__item__delete--outer':keyword.length < 4}"
                                 @click="$store.commit('DELETE_HISTORY_KEYWORD',keyword)">
                                <Icon name="close" />
                            </div>
                        </div>
                    </div>
                    <Tip v-else>
                        暂无历史搜索关键字
                    </Tip>
                </div>
            </Tab>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  function debounce(func, wait = 1000) {
    let timeout
    return function(event) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.call(this, event)
      }, wait)
    }
  }

  export default {
    name: 'SearchBox',
    props: {
      autoFocus: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        form: {
          keyword: this.$route.query.keyword
        },
        status: {
          activeTab: '搜索建议',
          showToolbox: false,
          isMouseOnToolbox: false,
          isInputFocused: false,
          selectedPromptIndex: -1
        },
        data: {
          promptKeywordList: []
        }
      }
    },
    computed: {
      ...mapGetters(['historyKeywordList']),
    },
    watch: {
      'form.keyword'(newVal) {
        if (newVal === '' || !newVal || newVal.length === 0) {
          this.clearPromptResult()
          return
        }
        this.status.selectedPromptIndex = -1
        this.status.showToolbox = true
        debounce(this.requestKeywordPrompt(), 5000)
      }
    },
    mounted() {
      debounce(this.requestKeywordPrompt(), 5000)
    },
    methods: {
      search(keyword = this.form.keyword.replace(/^\s+|\s+$/g, '')) {
        if (!keyword || keyword.length === 0) {
          this.$message.error('关键字不能为空')
          return
        }
        const isSearchedByPrompt = this.status.isInputFocused && this.status.selectedPromptIndex !== -1
        if (isSearchedByPrompt) {
          this.form.keyword = this.data.promptKeywordList[this.status.selectedPromptIndex]
        } else {
          this.form.keyword = keyword
        }
        this.$emit('on-search')
        this.$router.push({name: 'search', query: {keyword: this.form.keyword}})
      },
      clearPromptResult(emptyResult = true) {
        if (emptyResult) {
          this.data.promptKeywordList = []
        }
        this.status.showToolbox = false
      },
      async requestKeywordPrompt() {
        const keyword = this.form.keyword
        if (keyword && keyword.length > 0) {
          const {s: result} = await this.$axios.jsonp(`//suggestion.baidu.com/su?wd=${keyword}`, 'cb')
          this.data.promptKeywordList = result
        }
      },
      selectItem(direction) {
        const itemIndex = this.status.selectedPromptIndex
        const currentPromptKeywordIndex = (this.data.promptKeywordList.length - 1)
        if (direction === 'down') {
          const isLastItem = itemIndex === currentPromptKeywordIndex
          this.status.selectedPromptIndex = isLastItem ? 0 : itemIndex + 1
        }
        if (direction === 'up') {
          const isFirstItem = itemIndex === -1
          this.status.selectedPromptIndex = isFirstItem ? currentPromptKeywordIndex : itemIndex - 1
        }
      },
      highlightKeywordHtml(rawContent, highlightClassName) {
        const resultHtml = rawContent
        const keyword = this.form.keyword || ''
        const replaceReg = new RegExp(keyword, 'g')
        const replaceString = '<span style="opacity: .5;padding-right:4px;">' + keyword + '</span>'
        return resultHtml.replace(replaceReg, replaceString)
      },
      onInputFocus() {
        if (this.form.keyword !== '' && this.form.keyword.length > 0) {
          this.status.showToolbox = true
        }
        this.status.isInputFocused = true
      },
      onInputBlur() {
        this.clearPromptResult(false)
        this.status.isInputFocused = false
      }
    }
  }
</script>
