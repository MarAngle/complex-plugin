import buildLocalDataName from './buildLocalDataName'
import setLocalData from './setLocalData'

/**
 * 获取缓存
 * @param {string} name
 * @param {number} [time] 获取的时间间隔限制,按秒进行
 * @param {boolean} [refresh] 重置缓存时间戳
 * @returns {*}
 */
function getLocalData(name, time, refresh) {
  name = buildLocalDataName(name)
  let localDataStr = localStorage.getItem(name)
  if (localDataStr) {
    try {
      let localData = JSON.parse(localDataStr)
      if (time) {
        let currentTime = Date.now()
        time = time * 1000
        if ((currentTime - localData.time) > time) {
          localData.value = null
        }
      }
      if (refresh) {
        setLocalData(name, localData.value)
      }
      return localData.value
    } catch (e) {
      return undefined
    }
  } else {
    return undefined
  }
}

export default getLocalData
