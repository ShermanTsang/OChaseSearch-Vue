<style lang="scss" scoped>
    .engine-item {
        position: relative;
        padding: 16px;
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
            background-color: rgba(0,0,0,.4);
            transition: all .2s ease-in-out;
            color: #fff;
            padding: 10px;
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
        <div class="engine-item__action">

        </div>
    </div>
</template>

<script>
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
    computed: {},
    methods: {}
  }
</script>
