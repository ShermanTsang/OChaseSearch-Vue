<style lang="scss" scoped>
.setting {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;

  &__menu {
    width: 160px;
    border-right: 1px solid #eee;

    &__item {
      padding: 20px 16px;
      cursor: pointer;
      letter-spacing: 1px;
      font-size: 1rem;
      display: flex;
      flex-flow: row nowrap;
      transition: all .2s ease-in-out;
      color: #999;

      &__icon {
        margin-right: 10px;
      }

      &__text {
        color: #666;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }

    &__item--active {
      background-color: rgba(177, 177, 177, .1);
      box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
    }
  }

  &__main {
    width: 100%;
    padding: 16px;
    height: 85vh;
    overflow: auto;
  }
}
</style>

<template>
  <div class="setting">
    <div class="setting__menu">
      <div v-for="item in data.menuList" :key="item.name" class="setting__menu__item"
           :class="{'setting__menu__item--active': state.activeTab === item.name}"
           @click="clickSettingItem(item)">
        <div class="setting__menu__item__icon">
          <Icon :name="item.icon" size="1.15rem" />
        </div>
        <div class="setting__menu__item__text">{{ item.text }}</div>
      </div>
    </div>
    <div class="setting__main">
      <SettingEngine v-if="state.activeTab === 'engine'" />
      <SettingStyle v-if="state.activeTab === 'style'" />
      <SettingFeedback v-if="state.activeTab === 'feedback'" />
      <SettingPreference v-if="state.activeTab === 'preference'" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingLayout',
    props: {
      activeTab: {
        type: String,
        default: 'index'
      }
    },
    data() {
      return {
        data: {
          menuList: [
            {name: 'preference', text: '用户偏好', icon: 'check'},
            {name: 'engine', text: '搜索引擎', icon: 'list'},
            {name: 'style', text: '界面风格', icon: 'color'},
            {name: 'feedback', text: '意见反馈', icon: 'question'},
          ]
        },
        state: {
          activeTab: this.activeTab || null
        }
      }
    },
    computed: {},
    methods: {
      clickSettingItem(item) {
        this.state.activeTab = item.name
      }
    }
  }
</script>
