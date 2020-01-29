function getStateValueByCache(cacheKey,valueType,defaultValue) {
  const localCache = localStorage.getItem(cacheKey)
  if(!localCache) {
    return defaultValue
  }
  if(valueType === 'number') {
    return Number.parseInt(localCache) || defaultValue
  }
  if(valueType === 'object') {
    return JSON.parse(localCache) || defaultValue
  }
  if(valueType === 'string') {
    return JSON.parse(localCache) || defaultValue
  }
}

export default {
  themeColor: getStateValueByCache('config/themeColor','string','default'),
  modeRow: getStateValueByCache('config/modeRow','number',1),
  modeCol: getStateValueByCache('config/modeCol','number',2),
  activeEngineList: getStateValueByCache('config/activeEngineList','object',['baidu', 'doge']),
  engineList: getStateValueByCache('data/engineList','object',[]),
  pullEngineListTime: getStateValueByCache('config/pullEngineListTime','string',null),
}
