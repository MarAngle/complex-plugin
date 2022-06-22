import config from '../../../config';
import isSame from './isSame';

/**
 * 值是否存在
 * @param {*} value 需要判断的数据
 * @param {*[]} [existList] 为否但是需要判断为存在的值数组，默认为[false, 0]
 * @param {*[]} [unExistList] 为真但是需要判断为不存在的值数组，默认为[]
 * @returns {boolean}
 */
function isExist(value: any, existList?: any[], unExistList?: any[]) {
  if (value) {
    if (unExistList) {
      for (let i = 0; i < unExistList.length; i++) {
        const unExistItem = unExistList[i];
        if (isSame(unExistItem, value)) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }
  if (!existList) {
    existList = config.object.existList
  }
  return existList.indexOf(value) > -1
}

export default isExist
