<style lang="scss">
  .logo {
    cursor: pointer;
    font-size: 1.2rem;
    letter-spacing: 4px;
    color: #999;
  }
</style>

<template>
  <div class="logo">
    <img v-if="type === 'image'" :src="image" :style="style" alt="logo" @click="$router.push('/')">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      type: {
        type: String,
        default: 'text',
        validator(value) {
          return ['text','image', 'icon'].includes(value)
        }
      },
      height: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: ''
      }
    },
    computed: {
      image() {
        return this.type === 'text' ? this.$getImageAsset('logo') : '/favicon.ico'
      },
      style() {
        return {
          width: this.width,
          height: this.height
        }
      }
    }
  }
</script>
