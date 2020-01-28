<style lang="scss" scoped>
    .index {
        display: flex;
        flex-flow: row nowrap;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }
</style>

<template>
    <div class="index">
        <div class="index__container">
            <SearchBox></SearchBox>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Index',
    computed: {
      style() {
        return {
          color: this.color,
          fontSize: this.size,
          cursor: this.cursor
        }
      }
    }
  }
</script>
