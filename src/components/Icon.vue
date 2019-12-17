<style lang="scss">
  @import '../assets/iconfont/iconfont.css';

  .iconfont {
    letter-spacing: 1px;
  }
</style>

<template>
  <i v-if="name" :class="`iconfont icon-${name}`" :style="style" @click="$emit('click')" />
</template>

<script>
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
        default: 'default'
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
