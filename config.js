
const config = {
  Require: {
    devShowRule: true,
    failMsg: '服务器请求失败，请刷新重试或联系管理员！',
    formContentType: 'multipart/form-data'
  },
  RequireRule: {
    defaultTokenName: 'default'
  },
  TokenRule: {
    location: 'body'
  },
  local: {
    pre: 'default'
  },
  type: {
    emptyCheckList: ['object', 'array']
  },
  object: {
    existList: [false, 0]
  },
  url: {
    protocolPort: {
      'http:': '80',
      'https:': '443',
      'ftp:': '21'
    }
  },
  time: {
    format: {
      default: 'YYYY/MM/DD HH:mm:ss',
      target: 'YYYY/MM/DD HH:mm:ss'
    },
    dict: {
      list: ['year', 'month', 'date', 'hour', 'min', 'sec'],
      data: {
        year: {
          func: 'getFullYear',
          name: '年',
          code: 'YYYY',
          default: undefined,
          offset: 0,
          rate: {}
        },
        month: {
          func: 'getMonth',
          name: '月',
          code: 'MM',
          default: 0,
          offset: 1,
          rate: {}
        },
        date: {
          func: 'getDate',
          name: '日',
          code: 'DD',
          default: 1,
          offset: 0,
          rate: {
            down: 24
          }
        },
        hour: {
          func: 'getHours',
          name: '时',
          code: 'HH',
          default: 0,
          offset: 0,
          rate: {
            up: 24,
            down: 60
          }
        },
        min: {
          func: 'getMinutes',
          name: '分',
          code: 'mm',
          default: 0,
          offset: 0,
          rate: {
            up: 60,
            down: 60
          }
        },
        sec: {
          func: 'getSeconds',
          name: '秒',
          code: 'ss',
          default: 0,
          offset: 0,
          rate: {
            up: 60
          }
        }
      }
    }
  }
}

export default config
