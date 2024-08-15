import date from "./src/date"
import notice, { noticeOption } from "./src/notice"
import PluginLayout, { PluginLayoutData } from "./src/layout"

export type optionsType = {
  notice?: noticeOption
  date?: boolean
}

const install = function(options: optionsType = {}) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.date === false) {
      date.destory()
    }
  }
}

export {
  date,
  notice,
  PluginLayout,
  PluginLayoutData,
  install
}

