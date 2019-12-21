export default {
  engineList(state) {
    return (state.engineList && state.engineList.length > 0) ? state.engineList : []
  },
  activeEngineList(state, getters) {
    const activeEngineListWithData = []
    state.activeEngineList.forEach(itemSlug => {
      const matchEngineItem = getters.engineList.find(item => item.slug === itemSlug)
      activeEngineListWithData.push(matchEngineItem || {})
    })
    // const activeEngineListWithData = getters.engineList.filter(item => state.activeEngineList.includes(item.slug))
    // activeEngineListWithData.sort((a, b) => state.activeEngineList.indexOf(a.slug) - state.activeEngineList.indexOf(b.slug))
    return activeEngineListWithData || []
  },
  modeRow(state) {
    return state.modeRow > 0 ? state.modeRow : 0
  },
  modeCol(state) {
    return state.modeCol > 0 ? state.modeCol : 0
  },
  pullEngineListTime(state) {
    const localCache = localStorage.getItem('config/pullEngineListTime')
    return localCache || state.pullEngineListTime
  }
}
