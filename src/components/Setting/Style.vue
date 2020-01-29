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
                <Btn @click="setThemeColor('default')">默认:蓝色</Btn>
                <Btn @click="setThemeColor('orange')">橙色</Btn>
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
      return {
      }
    },
    methods: {
      setThemeColor(theme) {
        this.$store.commit('SET_THEME_COLOR',theme)
      }
    }
  }
</script>
