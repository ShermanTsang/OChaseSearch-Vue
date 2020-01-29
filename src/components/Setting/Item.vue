<style lang="scss" scoped>
    .setting-item {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 16px 10px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        transition: all .2s ease-in-out;

        &__main {
            display: flex;
            flex-flow: column nowrap;

            &__name {
                color: #333;
                font-size: 1rem;
                margin-bottom: 8px;
            }

            &__text {
                color: #999;
                font-size: .85rem;
                line-height: 1.4;
            }
        }

        &__action {

        }

        &:hover {
            background-color: rgba(#efefef,.2);
        }
    }
</style>

<template>
    <div class="setting-item">
        <div class="setting-item__main">
            <div class="setting-item__main__name">
                {{name}}
            </div>
            <div class="setting-item__main__text">
                {{text}}
                <slot/>
            </div>
        </div>
        <div class="setting-item__action">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SettingItem',
    props: {
      name: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: null
      }
    },
    computed: {}
  }
</script>
