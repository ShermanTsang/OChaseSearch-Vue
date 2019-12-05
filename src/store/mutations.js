export default {
  ['SET_ENGINE_LIST'](state, data) {
    state.engineList = data
    try {
      localStorage.setItem('data/engineList', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  },
  ['SET_ACTIVE_ENGINE_LIST'](state, data) {
    state.activeEngineList = data
    try {
      localStorage.setItem('config/activeEngineList', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  },
  ['SET_PULL_ENGINE_LIST_TIME'](state, data) {
    state.pullEngineListTime = data
    try {
      localStorage.setItem('config/pullEngineListTime', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
}
