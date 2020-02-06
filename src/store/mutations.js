function storeToLocalStorage(key,data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}

export default {
  ['SET_LANG'](state, lang) {
    state.lang = lang
    storeToLocalStorage('data/lang',lang)
  },
  ['SET_ENGINE_LIST'](state, engineList) {
    state.engineList = engineList
    storeToLocalStorage('data/engineList',engineList)
  },
  ['SET_ACTIVE_ENGINE_LIST'](state, activeEngineList) {
    const activeEngineArray = new Array(state.modeCol * state.modeRow).fill('')
    activeEngineArray.splice(0, activeEngineList.length, ...activeEngineList)
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
  ['SET_PULL_ENGINE_LIST_TIME'](state, lastPullTime) {
    state.pullEngineListTime = lastPullTime
    storeToLocalStorage('config/pullEngineListTime',lastPullTime)
  },
  ['SET_THEME_COLOR'](state, themeColor) {
    state.themeColor = themeColor
    storeToLocalStorage('config/themeColor',themeColor)
  },
  ['ADD_HISTORY_KEYWORD'](state, keyword) {
    const keywordSet = new Set([keyword,...state.historyKeywordList])
    const keywordArray = Array.from(keywordSet)
    state.historyKeywordList = keywordArray
    storeToLocalStorage('data/historyKeywordList',keywordArray)
  },
  ['DELETE_HISTORY_KEYWORD'](state, keyword) {
    const keywordSet = new Set(state.historyKeywordList)
    keywordSet.delete(keyword)
    const keywordArray = Array.from(keywordSet)
    state.historyKeywordList = keywordArray
    storeToLocalStorage('data/historyKeywordList',keywordArray)
  },
  ['EMPTY_HISTORY_KEYWORD'](state) {
    state.historyKeywordList = []
    storeToLocalStorage('data/historyKeywordList',[])
  }
}
