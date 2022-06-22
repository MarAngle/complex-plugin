import runText from '../../main';
import formatTime from './../../../data/time/formatTime'
import getOffsetTime from './../../../data/time/getOffsetTime'
import getOffsetTimeStr from './../../../data/time/getOffsetTimeStr'

runText(function({ checkSame, showError }) {
  checkSame(formatTime('2020/01/02 08:00:00', undefined, 'YYYYMMDDHHmmss'), '20200102080000', '基本日期字符串转换错误')

  checkSame(formatTime('2020/02 08:00:00', {
    format: 'YYYY/DD HH:mm:ss'
  }, 'YYYYMMDDHHmmss'), '20200102080000', '基本日期字符串初始数据为空时转换错误')

  checkSame(formatTime('2020/01/02 08:00:00', {
    format: 'YYYY/MM/DD HH:mm:ss'
  }, 'YYYYMMHHmmss'), '202001080000', '基本日期字符串显示数据为空时转换错误')

  checkSame(getOffsetTime((1200 + 30) * 60, 'sec', {
    start: 'hour',
    end: 'date'
  }), { hour: 20.5, date: 0 }, '由[秒]转换到[时-日]错误')

  checkSame(getOffsetTime(1.33333, 'date', {
    start: 'sec',
    end: 'hour'
  }), { min: 59, sec: 59.7119999999856, hour: 31 }, '由[日]转换到[秒-时]错误')

  checkSame(getOffsetTime(150.5, 'min', {
    start: 'min',
    end: 'hour'
  }), { min: 30.5, hour: 2 }, '由[分]转换到[分-时]错误')

  checkSame(getOffsetTime(150.5, 'min', {
    start: 'sec',
    end: 'hour'
  }), { min: 30, sec: 30, hour: 2 }, '由[分]转换到[秒-时]错误')

  checkSame(getOffsetTime(107, 'sec', {
    start: 'sec',
    end: 'hour'
  }), { min: 1, sec: 47, hour: 0 }, '由[秒]转换到[秒-时]错误')

  checkSame(getOffsetTimeStr(150.5, 'min', {
    start: 'sec',
    end: 'hour'
  }), '2时30分30秒', '由[分]转换到[秒-时]str错误')

  checkSame(getOffsetTimeStr(150.5, 'min', {
    start: 'sec',
    end: 'hour',
    format: {
      fixed: true
    }
  }), '02时30分30秒', '由[分]转换到[秒-时]str fixed模式错误')
}, 'time');
