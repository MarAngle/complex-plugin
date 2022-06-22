import runText from '../../main';
import formatNum from './../../../data/number/formatNum'
import getDecimal from './../../../data/number/getDecimal'
import getNum from './../../../data/number/getNum'
import getRandomNum from './../../../data/number/getRandomNum'
import parseNum from './../../../data/number/parseNum'

runText(function({ checkSame, showError }) {
  checkSame(formatNum('111'), 111, 'formatNum:字符串转换数字错误')
  checkSame(formatNum(' 111'), 111, 'formatNum:字符串空格转换数字错误')
  checkSame(formatNum(' 111 '), 111, 'formatNum:字符串空格转换数字错误')
  checkSame(formatNum({}), Number.NaN, 'formatNum:对象将转换为NaN')
  checkSame(formatNum({
    toString() {
      return '1111'
    }
  }), 1111, 'formatNum:对象实际会调用toString转换')
  checkSame(formatNum(Symbol('1')), Number.NaN, 'formatNum:Symbol将转换为NaN')

  checkSame(getNum(111.555), 111.56, 'getNum:默认四舍五入并保留2位')
  checkSame(getNum({}), 0, 'getNum:默认NANZERO，NaN数据会格式化为0')
  checkSame(getNum({}, 'round', 2, false), Number.NaN, 'getNum:NAN不自动格式化')
  checkSame(getNum(111.555, 'floor', 1), 111.5, 'getNum:向下取整1位')
  checkSame(getNum(111.444, 'ceil', 1), 111.5, 'getNum:向上取整1位')

  checkSame(parseNum(111.333), [111, 0.333], 'parseNum:错误')
  checkSame(parseNum('111.333'), [111, 0.333], 'parseNum:错误')
  // eslint-disable-next-line no-floating-decimal
  checkSame(parseNum(.333), [0, 0.333], 'parseNum:错误')
  checkSame(parseNum('.333'), [0, 0.333], 'parseNum:错误')
  checkSame(parseNum(111.00000333), [111, 0.00000333], 'parseNum:错误')
  checkSame(parseNum('111.00000333'), [111, 0.00000333], 'parseNum:错误')
  checkSame(parseNum(0.333), [0, 0.333], 'parseNum:错误')
  checkSame(parseNum('0.333'), [0, 0.333], 'parseNum:错误')
  checkSame(parseNum(0), [0, 0], 'parseNum:错误')
  checkSame(parseNum('0'), [0, 0], 'parseNum:错误')
  checkSame(parseNum(12), [12, 0], 'parseNum:错误')
  checkSame(parseNum('12'), [12, 0], 'parseNum:错误')

  const maxNumber = 9007199254740992

  let checkRandom = false
  if (checkRandom) {
    const numMax = 5000
    const max = 5
    let cache = []
    let per = numMax / max
    for (let n = 0; n < numMax; n++) {
      let num = getRandomNum(0, max)
      if (cache[num]) {
        cache[num]++
      } else {
        cache[num] = 1
      }
    }
    for (let i = 0; i < max; i++) {
      let rate = cache[i] / per
      if (rate <= 0.8 || rate >= 1.2) {
        showError('概率未按照需要产生，误差为:' + rate)
      }
    }
  }
}, 'number');
