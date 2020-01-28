<style lang="scss" scoped>
    .search {
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
</style>

<template>
    <div class="search">
        <div class="search__input">
            <input v-model="form.keyword" autofocus type="text" placeholder="" @keyup.enter="search">
        </div>
        <div class="search__button">
            <Icon name="search" color="#aaa" size="1rem" />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SearchBox',
    props: {},
    data() {
      return {
        form: {
          keyword: this.$route.query.keyword
        }
      }
    },
    methods: {
      search() {
        const keyword = this.form.keyword.replace(/^\s+|\s+$/g, '')
        if (!keyword || keyword.length === 0) {
          this.$message.error('关键字不能为空')
          return
        }
        this.$emit('on-search')
        this.$router.push({name: 'search', query: {keyword}})
      }
    }
  }
</script>
