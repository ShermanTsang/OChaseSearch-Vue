export default {
  setEngineList({commit}, data) {
    commit('SET_ENGINE_LIST', data)
  },
  setActiveEngine({commit}, data) {
    commit('SET_ACTIVE_ENGINE_LIST', data)
  },
  setModeCol({commit}, data) {
    commit('SET_MODE_COL', data)
  },
  setModeRow({commit}, data) {
    commit('SET_MODE_ROW', data)
  },
  setPullEngineListTime({commit}, data) {
    commit('SET_PULL_ENGINE_LIST_TIME', data)
  },
}
