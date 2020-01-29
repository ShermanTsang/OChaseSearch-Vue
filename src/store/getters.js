export default {
  engineList(state) {
    return (state.engineList && state.engineList.length > 0) ? state.engineList : []
  },
  activeEngineList(state, getters) {
    const activeEngineListWithData = new Array(state.modeCol * state.modeRow).fill({})
    state.activeEngineList.forEach((itemSlug,index) => {
      const matchEngineItem = getters.engineList.find(item => item.slug === itemSlug)
      activeEngineListWithData.splice(index,1,matchEngineItem || {})
    })
    return activeEngineListWithData || []
  },
  modeRow(state) {
    return state.modeRow > 0 ? state.modeRow : 0
  },
  modeCol(state) {
    return state.modeCol > 0 ? state.modeCol : 0
  },
  pullEngineListTime(state) {
    return state.pullEngineListTime || null
  },
  themeColor(state) {
    return state.themeColor || 'default'
  }
}
