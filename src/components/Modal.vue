<style lang="scss" scoped>
.modal {
  z-index: $z-index-modal;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &__overlay {
    position: fixed;
    z-index: $z-index-overlay;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
  }

  &__container {
    position: relative;
    z-index: $z-index-modal;
    height: auto;
    overflow: hidden;
    max-width: 95%;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 30px rgba(0, 0, 0, .2);

    &__header {
      border-bottom: 1px solid #eee;
      font-size: 1.1rem;
      letter-spacing: 2px;
      color: #666;
      padding: 20px;

      ::v-deep i {
        font-size: 20px;
      }

      &__close {
        color: #999;
        float: right;
        transition: all .2s ease-in-out;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    &__content {
    }

    &__footer {
      width: 100%;
    }

  }

}
</style>

<template>
  <transition name="fade">
    <div v-if="showModal" class="modal">
      <div class="modal__overlay" @click="toggleModalstate()"></div>
      <div class="modal__container" :style="containerStyle">
        <div class="modal__container__header">
          <Icon v-if="icon" :name="icon" />
          {{ title }}
          <span class="modal__container__header__close" @click="toggleModalstate()">
            <Icon name="close" cursor="pointer" />
          </span>
        </div>
        <div class="modal__container__content" :style="contentStyle">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal__container__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    model: {
      prop: 'showModal',
      event: 'toggleModalstate'
    },
    props: {
      width: {
        type: String,
        default: '90%'
      },
      contentPadding: {
        type: String,
        default: '20px'
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      showModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {
      containerStyle() {
        return {
          width: this.width
        }
      },
      contentStyle() {
        return {
          padding: this.contentPadding
        }
      }
    },
    methods: {
      toggleModalstate() {
        this.$emit('toggleModalstate', !this.showModal)
        this.$emit(this.showModal ? 'onOpen' : 'onClose')
      }
    }
  }
</script>
