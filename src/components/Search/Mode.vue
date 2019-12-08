<style lang="scss" scoped>
    .mode {
        &__select {

        }

        &__engine {

        }
    }
</style>

<template>
    <div class="mode">
        <div class="mode__select">
            <input v-model="col" type="number">
            <input v-model="row" type="number">
        </div>
        <div class="mode__engine"></div>
    </div>
</template>

<script>
  export default {
    name: 'SearchMode',
    props: {},
    data() {
      return {}
    },
    computed: {
      row: {
        get() {
          return this.$store.getters.modeRow
        },
        set(value) {
          this.$store.commit('SET_MODE_ROW', value)
        }
      },
      col: {
        get() {
          return this.$store.getters.modeCol
        },
        set(value) {
          this.$store.commit('SET_MODE_COL', value)
        }
      }
    },
    methods: {}
  }
</script>
