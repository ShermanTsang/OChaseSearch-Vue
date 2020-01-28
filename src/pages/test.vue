<style lang="scss" scoped>
</style>

<template>
    <div class="page">
        <span v-if="$apollo.queries.engineList.loading">loading...</span>
        {{engineList}}
        <hr>
        <ApolloQuery :query="queries.engineList" class="test">
            <template v-slot="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">{{ data }}</div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result</div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import queries from '@/graphql/queries'

  export default {
    name: 'Test',
    apollo: {
      engineList: {
        query: queries.engineList
      }
    },
    data() {
      return {
        queries,
        engineList: [],
      }
    },
    mounted() {
    },
    methods: {
      async test() {
      }
    }
  }
</script>
