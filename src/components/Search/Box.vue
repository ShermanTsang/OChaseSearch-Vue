<style lang="scss" scoped>
    .search {
        input {
            outline: none;
            color: #999;
            letter-spacing: 1px;
            width: 340px;
            padding: 10px 40px 10px 16px;
            border-radius: 1px;
            max-width: 100%;
            transition: all .2s ease-in-out;
            background-image: url('../../assets/image/search.png');
            background-repeat: no-repeat;
            /*background-position: 305px 5px;*/
            background-position: center right;
            background-size: 28px;
            border: 1px solid #ddd;

            @media ($screen-sm-min) {
                &:focus {
                    color: #666;
                    width: 360px;
                    box-shadow: rgba(177, 177, 177, 0.2) 0 0 10px inset;
                    background-color: rgb(248, 248, 248);
                }
            }
        }
    }
</style>

<template>
    <div class="search">
        <input v-model="form.keyword" type="text" placeholder="搜索..." @keyup.enter="search">
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
        this.$router.push({name: 'search', query: {keyword}})
        this.$emit('on-search')
      }
    }
  }
</script>
