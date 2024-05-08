<style lang="scss" scoped>
.mode {
  &__select {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &__item {
      position: relative;
      flex-grow: 1;
      width: 50%;
      $item-height: 40px;
      height: $item-height;
      overflow: hidden;

      label {
        height: $item-height;
        line-height: $item-height;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        letter-spacing: 3px;
        color: #666;
        font-size: 1rem;
        padding: 0 12px;
        box-shadow: 2px 0 12px rgba(177, 177, 177, .2);
      }

      input {
        height: $item-height;
        display: block;
        font-size: 1rem;
        color: #999;
        border: 2px solid #efefef;
        width: 98%;
        padding: 0 0 0 84px;
      }
    }
  }

  &__engine {
    display: grid;
    grid-column-gap: 10px;

    &__item {
      position: relative;
      margin-top: 10px;
      padding: 10px;
      height: 240px;
      background-color: rgba(177, 177, 177, .1);
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      color: #666;
      text-align: center;
      overflow: hidden;

      &__order {
        font-size: 4rem;
        font-style: italic;
        font-weight: 500;
        color: rgba(177, 177, 177, .2);
        display: block;
        cursor: default;
      }

      &__toolbar {
        transform: translateY(40px);
        transition: all .2s ease-in-out;
        position: absolute;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        background-color: rgba(177, 177, 177, .1);
        width: 100%;
        display: block;

        &:hover {
          background-color: rgba(177, 177, 177, .2);
        }
      }

      &:hover {
        .mode__engine__item__toolbar {
          transform: translateY(0);
        }
      }
    }
  }
}
</style>

<template>
  <div class="mode">
    <div class="mode__select">
      <div class="mode__select__item">
        <label for="col">列数</label>
        <input id="col" v-model="col" type="number" min="1" max="4" @input="checkInputLength($event.target)">
      </div>
      <div class="mode__select__item">
        <label for="row">行数</label>
        <input id="row" v-model="row" type="number" min="1" max="2" @input="checkInputLength($event.target)">
      </div>
    </div>
    <div class="mode__engine" :style="gridStyle">
      <div v-for="number in row*col" :key="number" class="mode__engine__item">
        <div class="mode__engine__item__order">
          {{ number }}
        </div>
        <template
            v-if="activeEngineListWithData && activeEngineListWithData[number - 1] && activeEngineListWithData[number - 1].name">
          {{ activeEngineListWithData[number - 1].name }}
          <div class="mode__engine__item__toolbar">
            <Icon name="delete" color="#999" cursor="pointer" @click="removeEngineItem(number)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: 'SearchMode',
    props: {},
    data() {
      return {}
    },
    computed: {
      row: {
        get() {
          return this.$store.getters.modeRow
        },
        set(value) {
          this.$store.commit('SET_MODE_ROW', value)
        }
      },
      col: {
        get() {
          return this.$store.getters.modeCol
        },
        set(value) {
          this.$store.commit('SET_MODE_COL', value)
        }
      },
      gridStyle() {
        return {
          'grid-template-columns': `repeat(${this.col}, 1fr)`,
          'grid-template-rows': `repeat(${this.row}, 1fr)`
        }
      },
      activeEngineListWithData() {
        return this.$store.getters.activeEngineList
      },
      ...mapState(['activeEngineList'])
    },
    methods: {
      removeEngineItem(number) {
        this.activeEngineList.splice(number - 1, 1, '')
        this.$store.commit('SET_ACTIVE_ENGINE_LIST', this.activeEngineList)
      },
      checkInputLength(target) {
        const {id: direction, value, min, max} = target
        if (value <= min || value >= max) {
          this.$toast.info(`数值设定范围${min}~${max}`)
          if (value < min) {
            this[direction] = min
          }
          if (value > max) {
            this[direction] = max
          }
        }
      }
    }
  }
</script>
