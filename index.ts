import date from "./src/date"
import notice, { noticeType } from "./src/notice"
import layout, { modInitOption } from "./src/layout"

export type optionsType = {
  notice?: noticeType
  layout?: false | Record<string, modInitOption>
  date?: boolean
}

const install = function(options: optionsType = {}) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.layout !== false) {
      layout.init(options.layout)
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

