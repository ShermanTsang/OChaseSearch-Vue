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
            z-index: 20;

            &__tab {

                &__prompt {

                    &__item {
                        padding: 8px 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #666666;
                        font-size: .95rem;
                        transition: .2s ease-in-out;

                        &:not(:first-child) {
                            border-top: 1px solid #efefef;
                        }

                        &:hover {
                            box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
                        }
                        /deep/ &__highlight {
                            @include theme-color;
                        }
                    }

                    &__item--active {
                        box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="search">
        <div class="search__box" :class="{'search__box--focused':status.showToolbox}">
            <div class="search__box__input">
                <input v-model="form.keyword" v-focus type="text" placeholder=""
                       @keyup.enter="search"
                       @keyup.down="selectItem('down')"
                       @keyup.up="selectItem('up')"
                       @blur="clearPromptResult(false)"
                       @focus="status.showToolbox = true">
            </div>
            <div class="search__box__button">
                <Icon name="search" color="#aaa" size="1rem" />
            </div>
        </div>
        <div v-if="status.showToolbox || status.isMouseOnToolbox" class="search__toolbox"
             @mouseenter="status.isMouseOnToolbox = true"
             @mouseleave="status.isMouseOnToolbox = false"
        >
            <Tab :tabNames="['搜索建议','历史记录']" defaultTab="搜索建议" class="search__toolbox__tab">
                <div slot="搜索建议">
                    <div class="search__toolbox__tab__prompt">
                        <div v-for="(keyword,index) in data.promptKeywordList" :key="keyword"
                             class="search__toolbox__tab__prompt__item"
                             :class="{'search__toolbox__tab__prompt__item--active': status.selectedPromptIndex === index}"
                             v-html="highlightKeywordHtml(keyword,'search__text')">
                        </div>
                    </div>
                </div>
                <div slot="历史记录">

                </div>
            </Tab>
        </div>
    </div>
</template>

<script>
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
    props: {},
    data() {
      return {
        form: {
          keyword: this.$route.query.keyword
        },
        status: {
          showToolbox: false,
          isMouseOnToolbox: false,
          selectedPromptIndex: -1
        },
        data: {
          promptKeywordList: []
        }
      }
    },
    watch: {
      'form.keyword'(newVal) {
        if (newVal === '' || !newVal || newVal.length === 0) {
          this.clearPromptResult()
          return
        }
        this.status.selectedPromptIndex = -1
        this.status.showToolbox = true
        debounce(this.queryKeywordPrompt(), 5000)
      }
    },
    methods: {
      search() {
        if (this.status.selectedPromptIndex !== -1) {
          this.form.keyword = this.data.promptKeywordList[this.status.selectedPromptIndex]
        }
        const keyword = this.form.keyword.replace(/^\s+|\s+$/g, '')
        if (!keyword || keyword.length === 0) {
          this.$message.error('关键字不能为空')
          return
        }
        this.$emit('on-search')
        this.$router.push({name: 'search', query: {keyword}})
      },
      clearPromptResult(emptyResult = true) {
        if (emptyResult) {
          this.data.promptKeywordList = []
        }
        this.status.showToolbox = false
      },
      async queryKeywordPrompt() {
        const keyword = this.form.keyword
        const {s: result} = await this.$axios.jsonp(`//suggestion.baidu.com/su?wd=${keyword}`, 'cb')
        this.data.promptKeywordList = result
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
      highlightKeywordHtml(rawContent,highlightClassName) {
        const resultHtml = rawContent
        const keyword = this.form.keyword || ''
        const replaceReg = new RegExp(keyword, 'g')
        const replaceString = `<span style="color: red">` + keyword + '</span>'
        return resultHtml.replace(replaceReg, replaceString)
      }
    }
  }
</script>
