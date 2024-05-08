<style lang="scss">
.tip {
  padding: 16px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  transition: all .2s ease-in-out;

  &__text {
    color: #999;
    font-size: .9rem;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 20px;
  }

}
</style>

<template>
  <div class="tip">
    <div class="tip__text">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tip',
    props: {
      type: {
        type: String,
        default: 'empty'
      }
    },
    computed: {}
  }
</script>
