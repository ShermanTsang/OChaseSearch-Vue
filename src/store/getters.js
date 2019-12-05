export default {
  engineList(state) {
    if (state.engineList && state.engineList.length > 0) {
      return state.engineList
    }
    try{
      const localCache = localStorage.getItem('data/engineList')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e){
      return []
    }
    return []
  },
  activeEngineList(state) {
    if (state.activeEngineList && state.activeEngineList.length > 0) {
      return state.activeEngineList
    }
    try{
      const localCache = localStorage.getItem('config/activeEngine')
      if (localCache) {
        return JSON.parse(localCache)
      }
    } catch (e){
      return []
    }
    return []
  },
  pullEngineListTime(state) {
   if(state.pullEngineListTime) {
     return state.pullEngineListTime
   }
    try{
      return localStorage.getItem('config/pullEngineListTime')
    } catch (e){
      return null
    }
  }
}
