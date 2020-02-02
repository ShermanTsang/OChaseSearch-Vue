function storeToLocalStorage(key,data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}

export default {
  ['SET_ENGINE_LIST'](state, data) {
    state.engineList = data
    storeToLocalStorage('data/engineList',data)
  },
  ['SET_ACTIVE_ENGINE_LIST'](state, data) {
    const activeEngineArray = new Array(state.modeCol * state.modeRow).fill('')
    activeEngineArray.splice(0, data.length, ...data)
    state.activeEngineList = activeEngineArray
    storeToLocalStorage('config/activeEngineList',activeEngineArray)
  },
  ['SET_MODE_ROW'](state, rowNum) {
    state.modeRow = Number.parseInt(rowNum)
    const fillLength = (rowNum * state.modeCol) - state.activeEngineList.length
    if (fillLength > 0) {
      const filledActiveList = [...state.activeEngineList, ...Array(fillLength).fill('')]
      this.commit('SET_ACTIVE_ENGINE_LIST', filledActiveList)
    }
    storeToLocalStorage('config/modeCol',Number.parseInt(rowNum))
  },
  ['SET_MODE_COL'](state, colNum) {
    state.modeCol = Number.parseInt(colNum)
    const fillLength = (colNum * state.modeRow) - state.activeEngineList.length
    if (fillLength > 0) {
      const filledActiveList = [...state.activeEngineList, ...Array(fillLength).fill('')]
      this.commit('SET_ACTIVE_ENGINE_LIST', filledActiveList)
    }
    storeToLocalStorage('config/modeCol',Number.parseInt(colNum))
  },
  ['SET_PULL_ENGINE_LIST_TIME'](state, data) {
    state.pullEngineListTime = data
    storeToLocalStorage('config/pullEngineListTime',data)
  },
  ['SET_THEME_COLOR'](state, data) {
    state.themeColor = data
    storeToLocalStorage('config/themeColor',data)
  },
  ['ADD_HISTORY_KEYWORD'](state, data) {
    const keywordSet = new Set([data,...state.historyKeywordList])
    const keywordArray = Array.from(keywordSet)
    state.historyKeywordList = keywordArray
    storeToLocalStorage('data/historyKeywordList',keywordArray)
  }
}
