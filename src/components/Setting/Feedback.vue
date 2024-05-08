<style lang="scss" scoped>
.setting-feedback {
  position: relative;
  height: 100%;

  &__iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="setting-feedback">
    <Nameplate>意见反馈</Nameplate>
    <iframe class="setting-feedback__iframe" :src="`https://support.qq.com/product/${config.tuCaoId}`"
            frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'SettingFeedback',
    props: {},
    data() {
      return {
        config: {
          tuCaoId: 113047
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>
