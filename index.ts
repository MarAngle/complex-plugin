import date from "./src/date"
import notice, { noticeType } from "./src/notice"
import layout from "./src/layout"

export type optionsType = {
  notice?: noticeType
  layout?: boolean
  date?: boolean
}

const install = function(options: optionsType = {}) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.layout !== false) {
      layout.init()
    }
    if (options.date === false) {
      date.stop()
    }
  }
}

export {
  date,
  notice,
  layout,
  install
}

