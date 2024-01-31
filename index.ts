import date from "./src/date"
import notice, { noticeType } from "./src/notice"
import { PluginLayout } from "./src/layout"

export type optionsType = {
  notice?: noticeType
  date?: boolean
}

const install = function(options: optionsType = {}) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.date === false) {
      date.stop()
    }
  }
}

export {
  date,
  notice,
  PluginLayout,
  install
}

