import date from "./src/date";
import notice, { noticeType } from "./src/notice";
import layout from "./src/layout";

type optionsType = {
  notice?: noticeType,
  layout?: () => void
}

const install = function(options?: optionsType) {
  if (options) {
    if (options.notice) {
      notice.init(options.notice)
    }
    if (options.layout) {
      layout.init(options.layout)
    }
  } else {
    layout.init()
  }
}

export {
  date,
  notice,
  layout,
  install
}