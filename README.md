<h1 align='center'>
  ZeroX Multicharacter for QBX core
</h1>

This script takes reference from the default [QBX](https://github.com/Qbox-project/qbx_core) script. I created this script to provide more interface to players who play your server.

The UI I created uses **React**, **Vite**, and **Tailwindcss**. You can customize it by downloading this main resource.

## Features

- Fresh UI
- Easy Configuration
- Create a New Character
- Add a New Character
- Delete a Character
- Allways spawn at the last location
- Invisible Character on the menu

## Screenshots

![3](https://r2.fivemanage.com/1HmlXP8c0itFbXHi4ACgz/images/20250209091130_1.jpg)

![2](https://r2.fivemanage.com/1HmlXP8c0itFbXHi4ACgz/images/20250209092957_1.jpg)

![1](https://r2.fivemanage.com/1HmlXP8c0itFbXHi4ACgz/images/20250209093013_1.jpg)

## Dependencies

- [qbx_core](https://github.com/Qbox-project/qbx_core)
- [ox_lib](https://github.com/overextended/ox_lib)

## Installation

1. Download a [release](https://github.com/ZeroX-Project/zx_multicharacter/releases) or build the source code.

2. Go to `qbx_core/client/character.lua` and find this code

   ```lua
   RegisterNetEvent('qbx_core:client:playerLoggedOut', function()
       if GetInvokingResource() then return end -- Make sure this can only be triggered from the server
       chooseCharacter()
   end)

   CreateThread(function()
       while true do
           Wait(0)
           if NetworkIsSessionStarted() then
               pcall(function() exports.spawnmanager:setAutoSpawn(false) end)
               Wait(250)
               chooseCharacter()
               break
           end
       end
   end)
   ```

   delete or uncomment this code.

3. Put `zx_multicharacter` on your resources
4. Adjust your config in `zx_multicharacter/shared/config.lua`.
5. Add `ensure zx_multicharacter` on your `server.cfg`

## Building the UI

### Requirements:

- Node.js (LTS)
- pnpm

### Installing Node.js:

- Download the LTS version of Node.js.
- Go through the install and make sure you install all of the features.
- Run node --version in cmd and make sure that it gives you the version number. If it doesn't then you didn't install it correctly.

### Installing pnpm:

- After installing NodeJS you can install pnpm by running npm install -g pnpm.

### Building the UI:

- cd into the web directory.
- run pnpm i to install the dependencies.
- run pnpm build to build the source files.

---

When working in the browser you can run `pnpm run dev`, which supports hot reloads meaning that you will see your changes after saving your file.

If you want to work in game you can run `pnpm run build:watch` which writes changes to disk, so the only thing you have to do is restart the resource for it take affect.

---

<p align="center">©️ <a href="https://www.youtube.com/channel/UCCbuILiiNcuJsOb-sLM95oQ">ZeroX Project</a> 2025 - All rights reserved.</p>
