export default {
  engineList(state) {
    if (state.engineList && state.engineList.length > 0) {
      return state.engineList
    }
  },
  activeEngineList(state, getters) {
    const activeEngineListWithData = getters.engineList.filter(item => state.activeEngineList.includes(item.slug))
    activeEngineListWithData.sort((a, b) => state.activeEngineList.indexOf(a.slug) - state.activeEngineList.indexOf(b.slug))
    return activeEngineListWithData || []
  },
  modeRow(state) {
    if (state.modeRow > 0) {
      return state.modeRow
    }
  },
  modeCol(state) {
    if (state.modeCol > 0) {
      return state.modeCol
    }
  },
  pullEngineListTime(state) {
    const localCache = localStorage.getItem('config/pullEngineListTime')
    return localCache || state.pullEngineListTime
  }
}
