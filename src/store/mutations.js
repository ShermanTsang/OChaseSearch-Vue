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
    const activeEngineArray = new Array(state.modeCol * state.modeRow).fill('')
    activeEngineArray.splice(0, data.length, ...data)
    state.activeEngineList = activeEngineArray
    try {
      localStorage.setItem('config/activeEngineList', JSON.stringify(activeEngineArray))
    } catch (e) {
      console.log(e)
    }
  },
  ['SET_MODE_ROW'](state, rowNum) {
    state.modeRow = Number.parseInt(rowNum)
    const fillLength = (rowNum * state.modeCol) - state.activeEngineList.length
    if (fillLength > 0) {
      const filledActiveList = [...state.activeEngineList, ...Array(fillLength).fill('')]
      this.commit('SET_ACTIVE_ENGINE_LIST', filledActiveList)
    }
    try {
      localStorage.setItem('config/modeRow', JSON.stringify(Number.parseInt(rowNum)))
    } catch (e) {
      console.log(e)
    }
  },
  ['SET_MODE_COL'](state, colNum) {
    state.modeCol = Number.parseInt(colNum)
    const fillLength = (colNum * state.modeRow) - state.activeEngineList.length
    if (fillLength > 0) {
      const filledActiveList = [...state.activeEngineList, ...Array(fillLength).fill('')]
      this.commit('SET_ACTIVE_ENGINE_LIST', filledActiveList)
    }
    try {
      localStorage.setItem('config/modeCol', JSON.stringify(Number.parseInt(colNum)))
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
