local config = require('shared.config')

lib.locale(config.Locales)
shared = {
  ---@diagnostic disable-next-line: undefined-global
  cur = locale("cur")
}
