<style lang="scss" scoped>
.loading {
  max-width: 100%;
  max-height: 100%;

  &__element {
    position: relative;
  }

  &__element__bounce1, &__element__bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $theme-default-color;
    @include theme-background-color();
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: bounce 2.0s infinite ease-in-out;
  }

  &__element__bounce2 {
    animation-delay: -1.0s;
  }

  &__text {
    margin-top: 10px;
    @include theme-color();
    font-size: .9rem;
    letter-spacing: 1px;
  }

  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: scale(0.0)
    }
    50% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }

}

.loading--fixed {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .9);
  z-index: auto;

  .loading {
    &__element {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__text {
      margin-top: 30px;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

</style>

<template>
  <div :class="{'loading--fixed': fix}" class="loading">
    <div :style="style" class="loading__element">
      <div class="loading__element__bounce1"></div>
      <div class="loading__element__bounce2"></div>
    </div>
    <div v-if="$slots.default && $slots.default[0]" class="loading__text">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      fix: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: '48px'
      }
    },
    computed: {
      style() {
        return {
          width: this.size,
          height: this.size
        }
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
