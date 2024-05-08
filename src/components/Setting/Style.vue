<style lang="scss" scoped>
.setting-style {
  position: relative;
}
</style>

<template>
  <div class="setting-style">
    <Nameplate>样式</Nameplate>
    <SettingItem name="主题色">
      选择适合你心情的主题
      <div slot="action">
        <Btn @click="setThemeColor('default')">
          <Icon v-if="themeColor === 'default'" name="check" color="#aaa" style="margin-right: 10px" />
          蓝色
        </Btn>
        <Btn @click="setThemeColor('orange')">
          <Icon v-if="themeColor === 'orange'" name="check" color="#aaa" style="margin-right: 10px" />
          橙色
        </Btn>
      </div>
    </SettingItem>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
  import queries from '@/graphql/queries'

  export default {
    name: 'SettingStyle',
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['themeColor'])
    },
    methods: {
      setThemeColor(theme) {
        this.$store.commit('SET_THEME_COLOR', theme)
      }
    }
  }
</script>
