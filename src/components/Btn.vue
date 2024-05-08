<style lang="scss">
.btn {
  cursor: pointer;
  border: 1px solid #ccc;
  color: #666;
  border-radius: 2px;
  padding: 4px 10px;
  letter-spacing: 1px;
  background-color: transparent;
  transition: all .2s ease-in-out;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:hover {
    @include theme-color();
    @include theme-border-color();
  }
}

.btn--colorful {
  border: none;
  @include gradient-background;

  &:hover {
    color: #fff;
  }
}

.btn--disabled {
  pointer-events: none;
  color: #999;
  background-color: #efefef;
}
</style>

<template>
  <button class="btn" :class="classes" :style="style" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      width: {
        type: String,
        default: null
      },
      height: {
        type: String,
        default: ''
      },
      fullWidth: {
        type: Boolean,
        default: false
      },
      colorful: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: String,
        default: '1rem'
      }
    },
    computed: {
      style() {
        const fullWidth = {width: '100%'}
        const height = {height: this.height}
        const width = {width: this.width}
        const fontSize = {'font-size': this.fontSize}
        return Object.assign(
          height, width, this.fullWidth ? fullWidth : '', fontSize
        )
      },
      classes() {
        return {
          'btn--colorful': this.colorful,
          'btn--disabled': this.disabled
        }
      }
    },
    methods: {}
  }
</script>
