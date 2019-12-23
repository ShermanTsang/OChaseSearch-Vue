<style lang="scss" scoped>
    .engine-item {
        position: relative;
        padding: 24px 16px;
        background-color: rgba(177, 177, 177, .1);
        flex: 0 0 240px;
        margin: 4px;
        transition: all .2s ease-in-out;
        overflow: hidden;

        &:hover {
            box-shadow: 0 0 16px rgba(177, 177, 177, .4) inset;
        }

        &__icon {

        }

        &__main {
            color: #666;

            small {
                color: #999;
            }
        }

        &__action {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -100px;
            background-color: rgba(0, 0, 0, .4);
            transition: all .2s ease-in-out;
            color: #fff;
            display: grid;

            &__item {
                cursor: pointer;
                text-align: center;
                transition: all .2s ease-in-out;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                border:1px solid rgba(0,0,0,.1);
                font-style: italic;

                &:hover {
                    background-color: rgba(0,0,0,.2);
                }
            }
        }

        &:hover {
            .engine-item__action {
                height: 100%;
                bottom: 0;
            }
        }
    }
</style>

<template>
    <div class="engine-item">
        <div class="engine-item__icon">
        </div>
        <div class="engine-item__main">
            {{item.name}}
            <br>
            <small>{{item.slug}}</small>
        </div>
        <div class="engine-item__action" :style="gridStyle">
            <div v-for="number in modeCol*modeRow" :key="number" class="engine-item__action__item" @click="setEngine(number)">
                {{number}}
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: 'SearchEngineItem',
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      gridStyle() {
        return {
          'grid-template-columns': `repeat(${this.modeCol}, 1fr)`,
          'grid-template-rows': `repeat(${this.modeRow}, 1fr)`
        }
      },
      ...mapGetters(['modeRow', 'modeCol']),
      ...mapState(['activeEngineList'])
    },
    methods: {
      setEngine(number) {
        this.activeEngineList.splice(number - 1,1,this.item.slug)
        this.$store.commit('SET_ACTIVE_ENGINE_LIST',this.activeEngineList)
      }
    }
  }
</script>
