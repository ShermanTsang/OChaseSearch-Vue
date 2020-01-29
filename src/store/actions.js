export default {
  setEngineList({commit}, data) {
    commit('SET_ENGINE_LIST', data)
  },
  setActiveEngineArray({commit}, data) {
    commit('SET_ACTIVE_ENGINE_ARRAY', data)
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
  setThemeColor({commit}, data) {
    commit('SET_THEME_COLOR', data)
  },
}
