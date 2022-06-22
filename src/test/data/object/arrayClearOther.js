
import runText from '../../main'
import arrayClearOther from '../../../data/object/arrayClearOther'

runText(function({ checkSame }) {
  let list = [0, 1, 2, 3, 4, 5, 6]
  arrayClearOther(list, 3, 0)
  checkSame(list, [3], 'arrayClearOther错误')
  let list2 = [0, 1, 2, 3, 4, 5, 6]
  arrayClearOther(list2, 3, 1)
  checkSame(list2, [0, 3], 'arrayClearOther错误')
}, 'arrayClearOther')
