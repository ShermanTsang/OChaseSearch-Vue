<style lang="scss">
</style>

<template>
    <div class="page">
        <span v-if="$apollo.queries.engines.loading">loading...</span>
        {{engines}}
        <br>
        {{users}}
    </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'Test',
    apollo: {
      engines: {
        query: gql`query {engines{name}}`,
      },
      users: {
        query: gql`query {users{data{name}}}`
      }
    },
    data() {
      return {
        engines: [],
        users: []
      }
    },
    mounted() {
      this.test()
    },
    methods: {
      async test() {
        // const res = await this.$apollo.query({query: gql`query {engines{data{name}}}`})
        const {data: {engineList}} = await this.$apollo.query({query: gql`query {engineList:engines{id name slug url}}`})
        console.log(engineList)
      }
    }
  }
</script>
