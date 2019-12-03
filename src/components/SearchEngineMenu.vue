<style lang="scss" scoped>
    .engine {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $z-index-modal;

        &__overlay {
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: $z-index-overlay;
            background-color: rgba(0, 0, 0, .2);
        }

        &__main {
            position: fixed;
            bottom: 0;
            left: 40px;
            right: 40px;
            background-color: #fff;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 400px;
            border-radius: 4px 4px 0 0 ;
            box-shadow: 0 -2px 16px rgba(0,0,0,.1);
            padding: 24px;

            &__list {
                overflow: auto;
                &__item {

                }
            }

        }
    }
</style>

<template>
    <div class="engine">
        <div class="engine__overlay">
        </div>
        <div class="engine__main">
            <div class="engine__main__list">
                <div v-for="item in engineList" :key="item.id" class="engine__main__list__item">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SearchEngineMenu',
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['engineList', 'activeEngineList'])
    },
    methods: {}
  }
</script>
