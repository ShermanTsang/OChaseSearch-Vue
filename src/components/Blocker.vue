<style lang="scss">
.blocker {
  display: flex;
  color: #999;
  font-size: .9rem;
  align-items: center;
  justify-content: center;
  cursor: default;

  &__divider {
    height: 1px;
    width: 100%;
    background-color: rgba(177, 177, 177, .3);
  }
}
</style>

<template>
  <div class="blocker" :style="style">
    <div v-if="divider" class="blocker__divider" :style="dividerStyle"></div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Blocker',
    props: {
      height: {
        type: String,
        default: '0'
      },
      width: {
        type: String,
        default: '100%'
      },
      dividerWidth: {
        type: String,
        default: '100%'
      },
      dividerHeight: {
        type: String,
        default: '1px'
      },
      divider: {
        type: Boolean,
        default: undefined
      }
    },
    computed: {
      style() {
        return {
          height: this.height,
          width: this.width
        }
      },
      dividerStyle() {
        return {
          width: this.dividerWidth,
          height: this.dividerHeight
        }
      }
    }
  }
</script>
