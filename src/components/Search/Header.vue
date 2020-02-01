<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 64px;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
        transition: all .2s ease-in-out;
        box-shadow: 0 2px 8px rgba(177, 177, 177, .2);
        background-color: #fff;
        z-index: 1;

        &__container {
            margin: 0 auto;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;

            &__logo {

            }

            &__search {
                input {

                }
            }
        }

    }
</style>

<template>
    <header class="header">
        <div class="header__container">
            <div class="header__logo" @click="$router.push({name:'index'})">
                <Logo type="text">逐搜</Logo>
            </div>
            <div class="header__search">
                <slot />
            </div>
            <div class="header__action">
                <slot name="action" />
            </div>
        </div>
    </header>
</template>

<script>
  export default {
    name: 'SearchHeader',
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>
