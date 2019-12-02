<style lang="scss" scoped>
    .engine {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $z-index-modal;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

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

        &__list {
            background-color: #fff;
            &__item {

            }
        }
    }
</style>

<template>
    <div class="engine">
        <div class="engine__overlay">
        </div>
        <div class="engine__list">
            <div v-for="item in engineList" :key="item.id" class="engine__list__item">
                {{item}}
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
