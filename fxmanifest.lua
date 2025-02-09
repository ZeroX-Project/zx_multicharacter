fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'zx_multicharacter'
version '1.0.0'
author 'ZeroX Project'
description 'ZeroX Multicharacter for QBX core'

shared_scripts {
  '@ox_lib/init.lua',
  '@qbx_core/modules/lib.lua',
}

ox_libs {
  'locale',
}

client_scripts {
  '@qbx_core/modules/playerdata.lua',
  'client.lua',
}

files {
  'data/*.lua',
  'shared/*.lua',
  'locales/*.json',
  'web/assets/*',
  'web/assets/**/*',
  'web/build/index.html',
  'web/build/**/*',
}

ui_page 'web/build/index.html'
