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
  'config/*.lua'
}

client_scripts {
  '@qbx_core/modules/playerdata.lua',
  'client.lua',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'server.lua',
}

files {
  'modules/*.lua',
  'web/build/index.html',
  'web/build/**/*',
}

ui_page 'web/build/index.html'
