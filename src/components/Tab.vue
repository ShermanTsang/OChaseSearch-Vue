<style lang="scss" scoped>
    .tab {
        &__header {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            height: 40px;
            border-bottom: 1px solid #eee;

            &__item {
                flex-grow: 1;
                text-align: center;
                color: #999;
                font-size: .95rem;
                letter-spacing: 1px;
                cursor: pointer;
            }

            &__item--active {
                color: #333;
            }
        }

        &__main {

        }
    }
</style>

<template>
    <div class="tab">
        <div class="tab__header">
            <div v-for="name in tabNames" :key="name" class="tab__header__item"
                 :class="{'tab__header__item--active':status.activeTab === name}" @click="clickTab(name)">
                {{name}}
            </div>
        </div>
        <div v-for="name in tabNames" :key="name" class="tab__content">
            <template v-if="status.activeTab === name">
                <slot :name="name" />
            </template>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      tabNames: {
        type: Array,
        default() {
          return []
        }
      },
      defaultTab: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        status: {
          activeTab: this.defaultTab
        }
      }
    },
    methods: {
      clickTab(tabName) {
        this.status.activeTab = tabName
        this.$emit('changeTab',tabName)
      }
    }
  }
</script>
