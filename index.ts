import date from "./src/date";
import notice, { noticeType } from "./src/notice";
import layout, { initLayout, layoutType } from "./src/layout";

type optionsType = {
  notice?: noticeType,
  layout?: boolean | ((layoutData: layoutType) => void),
  date?: boolean
}

const install = function(options: optionsType = {}) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.layout !== false) {
      initLayout(options.layout)
    }
    if (options.date !== false) {
      date.init()
    }
  }
}

export {
  date,
  notice,
  layout,
  install
}