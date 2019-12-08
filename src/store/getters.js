export default {
  engineList(state) {
    if (state.engineList && state.engineList.length > 0) {
      return state.engineList
    }
    try {
      const localCache = localStorage.getItem('data/engineList')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e) {
      return []
    }
    return []
  },
  activeEngine(state) {
    if (state.activeEngine && state.activeEngine.length > 0) {
      return state.activeEngine
    }
    try {
      const localCache = localStorage.getItem('config/activeEngine')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e) {
      return []
    }
    return []
  },
  modeRow(state) {
    if (state.modeRow && state.modeRow.length > 0) {
      return state.modeRow
    }
    try {
      const localCache = localStorage.getItem('config/modeRow')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e) {
      return []
    }
    return []
  },
  modeCol(state) {
    if (state.modeCol && state.modeCol.length > 0) {
      return state.modeCol
    }
    try {
      const localCache = localStorage.getItem('config/modeCol')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e) {
      return []
    }
    return []
  },
  pullEngineListTime(state) {
    if (state.pullEngineListTime) {
      return state.pullEngineListTime
    }
    try {
      return localStorage.getItem('config/pullEngineListTime')
    } catch (e) {
      return null
    }
  }
}
