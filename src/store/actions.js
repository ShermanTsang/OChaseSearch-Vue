export default {
  setEngineList({commit}, data) {
    commit('SET_ENGINE_LIST', data)
  },
  setActiveEngineList({commit}, data) {
    commit('SET_ACTIVE_ENGINE_LIST', data)
  },
  setPullEngineListTime({commit}, data) {
    commit('SET_PULL_ENGINE_LIST_TIME', data)
  },
}
