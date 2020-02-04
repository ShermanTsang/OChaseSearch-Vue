<style lang="scss" scoped>
  .iconfont {
    letter-spacing: 1px;
  }
</style>

<template>
  <i v-if="name" :class="`iconfont icon-${name}`" :style="style" @click="$emit('click')" />
</template>

<script>
  import '../assets/iconfont/iconfont.css'

  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: null
      },
      size: {
        type: String,
        default: null
      },
      cursor: {
        type: String,
        default: 'unset'
      }
    },
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
