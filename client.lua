if not lib then return end

local config = require 'shared.config'
local defaultSpawn = require 'shared.config'.defaultSpawn
local randomPeds = require('shared.randomPeds')

local previewCam
local onRegistered = false
local onMenu = false
local cidNewCharacter

local animDictionary = "anim@amb@casino@hangout@ped_male@stand@02b@idles"
local animationName = "idle_a"

local function init()
  local uiLocales = {}
  local locales = lib.getLocales()

  for k, v in pairs(locales) do
    if k:find('^NUI_') then
      uiLocales[k] = v
    end
  end

  SendNUIMessage({
    action = 'init',
    data = {
      locale = uiLocales,
      assetspath = 'nui://zx_multicharacter/web/assets',
      config = {
        nationalities = lib.load('data.nationalities'),
        maxCharacter = config.maxCharacter,
        enableDeleteButton = config.enableDeleteButton,
        dateFormat = config.dateFormat,
        dateMin = config.dateMin,
        dateMax = config.dateMax,
        badWords = config.profanityWords
      },
    }
  })

  print('Loaded NUI Successfully')
end

local function setupPreviewCam()
  DoScreenFadeIn(1000)

  local cameras = {
    vec3(0.0, 2.0, 0.6),
    vec3(-0.6, -2.2, -0.05),
  }
  local coords, point = table.unpack(cameras)

  local camCoords = GetOffsetFromEntityInWorldCoords(cache.ped, coords.x, coords.y, coords.z)
  local camPoint = GetOffsetFromEntityInWorldCoords(cache.ped, point.x, point.y, point.z)
  previewCam = CreateCameraWithParams("DEFAULT_SCRIPTED_CAMERA", camCoords.x, camCoords.y, camCoords.z, 0.0,
    0.0, 0.0, 49.0, false, 0)

  PointCamAtCoord(previewCam, camPoint.x, camPoint.y, camPoint.z)
  SetCamActive(previewCam, true)

  RenderScriptCams(true, false, 0, true, true)

  CreateThread(function()
    while DoesCamExist(previewCam) do
      SetUseHiDof()
      Wait(0)
    end
  end)
end

local function destroyPreviewCam()
  if not previewCam then return end

  SetTimecycleModifier('default')
  SetCamActive(previewCam, false)
  DestroyCam(previewCam, true)
  RenderScriptCams(false, false, 1, true, true)
  FreezeEntityPosition(cache.ped, false)
  DisplayRadar(true)
  previewCam = nil
end

local function randomPed(gender)
  local ped = gender and gender == 'Male' and randomPeds[1] or gender and gender == 'Female' and randomPeds[2] or
      randomPeds[math.random(1, #randomPeds)]

  lib.requestModel(ped.model, config.loadingModelsTimeout)
  SetPlayerModel(cache.playerId, ped.model)
  pcall(function() exports['illenium-appearance']:setPedAppearance(PlayerPedId(), ped) end)
  SetModelAsNoLongerNeeded(ped.model)
end

local function previewPed(citizenId, gender)
  if not citizenId then
    randomPed(gender)
    return
  end

  local clothing, model = lib.callback.await('qbx_core:server:getPreviewPedData', false, citizenId)
  if model and clothing then
    lib.requestModel(model, config.loadingModelsTimeout)
    SetPlayerModel(cache.playerId, model)
    pcall(function() exports['illenium-appearance']:setPedAppearance(PlayerPedId(), json.decode(clothing)) end)
    SetModelAsNoLongerNeeded(model)
  else
    randomPed()
  end

  if not IsEntityPlayingAnim(PlayerPedId(), animDictionary, animationName, 1) then
    lib.requestAnimDict(animDictionary)
    TaskPlayAnim(PlayerPedId(), animDictionary, animationName, 5.0, 5.0, -1, 1, 0, false, false, false)
    RemoveAnimDict(animDictionary)
  end
end

local function createCharacter()
  previewPed()

  if not onRegistered then
    onRegistered = true
    onMenu = true

    SetNuiFocus(true, true)
    SendNUIMessage({
      action = 'registerNewCharacter',
      data = true
    })
  end
end

local function chooseCharacter()
  local characters, amount = lib.callback.await('qbx_core:server:getCharacters')
  local firstCharacterCitizenId = characters[1] and characters[1].citizenid
  previewPed(firstCharacterCitizenId)

  local position = characters[1] and characters[1].position or config.defaultSpawn

  SetFollowPedCamViewMode(2)
  DisplayRadar(false)

  DoScreenFadeOut(500)

  while not IsScreenFadedOut() and cache.ped ~= PlayerPedId() do
    Wait(0)
  end

  FreezeEntityPosition(cache.ped, true)
  Wait(1000)
  SetEntityCoords(cache.ped, position.x, position.y, position.z, false, false, false, false)
  SetEntityHeading(cache.ped, position.w)
  PlaceObjectOnGroundProperly(cache.ped)

  NetworkStartSoloTutorialSession()

  while not NetworkIsInTutorialSession() do
    Wait(0)
  end

  Wait(1500)
  ShutdownLoadingScreen()
  ShutdownLoadingScreenNui()

  setupPreviewCam()

  local options = {}

  local characterCount = #characters == 0 and 1 or #characters

  for i = 1, characterCount do
    local character = characters[i]
    if character then
      options[i] = {
        citizenid = character.citizenid,
        firstname = character.charinfo.firstname,
        lastname = character.charinfo.lastname,
        dob = character.charinfo.birthdate,
        national = character.charinfo.nationality,
        sex = character.charinfo.gender == 0 and 'Male' or "Female",
        job = character.job.label,
        jobGrade = character.job.grade.name,
        coords = character.position,
        cash = character.money.cash,
        bank = character.money.bank,
        index = i
      }
    else
      cidNewCharacter = i
      createCharacter()
      if onRegistered then return end
      previewPed(firstCharacterCitizenId)
    end
  end

  SetTimecycleModifier('default')

  if options and options[1] ~= nil then
    onMenu = true
    SetNuiFocus(true, true)
    SendNUIMessage({
      action = 'openUI',
      data = {
        playerId = cache.playerId,
        characters = options
      }
    })
  end

  lib.requestAnimDict(animDictionary)
  TaskPlayAnim(PlayerPedId(), animDictionary, animationName, 5.0, 5.0, -1, 1, 0, false, false, false)
  RemoveAnimDict(animDictionary)
end

RegisterNetEvent('zx_multicharacter:chooseCharacter', chooseCharacter)

local function spawnDefault()
  DoScreenFadeOut(500)

  while not IsScreenFadedOut() do
    Wait(0)
  end

  destroyPreviewCam()

  pcall(function()
    exports.spawnmanager:spawnPlayer({
      x = defaultSpawn.x,
      y = defaultSpawn.y,
      z = defaultSpawn.z,
      heading = defaultSpawn.w
    })
  end)

  TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
  TriggerEvent('QBCore:Client:OnPlayerLoaded')
  TriggerServerEvent('qb-houses:server:SetInsideMeta', 0, false)
  TriggerServerEvent('qb-apartments:server:SetInsideMeta', 0, 0, false)

  while not IsScreenFadedIn() do
    Wait(0)
  end

  TriggerEvent('qb-clothes:client:CreateFirstCharacter')
end

RegisterNUICallback('registerSubmit', function(data, cb)
  local newData = lib.callback.await('qbx_core:server:createCharacter', false, {
    firstname = data.firstname,
    lastname = data.lastname,
    nationality = data.nationality,
    gender = data.gender == locale('char_male') and 0 or 1,
    birthdate = data.birthdate,
    cid = cidNewCharacter
  })

  destroyPreviewCam()

  Wait(250)

  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })

  onRegistered = false
  cidNewCharacter = nil
  onMenu = false

  if GetResourceState('qbx_spawn') == 'missing' then
    spawnDefault()
  else
    if config.startingApartment then
      TriggerEvent('apartments:client:setupSpawnUI', newData)
    else
      TriggerEvent('qbx_core:client:spawnNoApartments')
    end
  end

  cb({ "ok" })
end)

RegisterNUICallback("swapCharacter", function(char, cb)
  previewPed(char.citizenid)
  cb({ 'ok' })
end)

RegisterNUICallback("spawnCharacter", function(char, cb)
  DoScreenFadeOut(1000)

  while not IsScreenFadedOut() do
    Wait(0)
  end

  lib.callback.await('qbx_core:server:loadCharacter', false, char.citizenid)

  destroyPreviewCam()

  FreezeEntityPosition(cache.ped, false)
  DisplayRadar(true)

  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })

  if config.spawnAtLastLocation then
    pcall(function()
      exports.spawnmanager:spawnPlayer({
        x = char.coords.x,
        y = char.coords.y,
        z = char.coords.z,
        heading = char.coords.w
      })
    end)
  else
    if GetResourceState('qbx_spawn') == 'missing' then
      spawnDefault()
    else
      if config.startingApartment then
        TriggerEvent('apartments:client:setupSpawnUI', newData)
      else
        TriggerEvent('qbx_core:client:spawnNoApartments')
      end
    end
  end

  TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
  TriggerEvent('QBCore:Client:OnPlayerLoaded')
  TriggerServerEvent('qb-houses:server:SetInsideMeta', 0, false)
  TriggerServerEvent('qb-apartments:server:SetInsideMeta', 0, 0, false)

  onMenu = false
  onRegistered = false
  DoScreenFadeIn(1000)
  while not IsScreenFadedIn() do
    Wait(0)
  end

  cb({ "ok" })
end)

RegisterNUICallback("createNewCharacter", function(data, cb)
  cidNewCharacter = data.cid
  onMenu = false
  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })
  createCharacter()
  cb({ "ok" })
end)

RegisterNUICallback("deleteCharacter", function(char, cb)
  TriggerServerEvent('qbx_core:server:deleteCharacter', char.citizenid)
  onMenu = false
  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })
  destroyPreviewCam()
  chooseCharacter()
  cb({ "ok" })
end)

RegisterNUICallback('uiLoaded', function(_, cb)
  cb({ 'ok' })
end)

RegisterNUICallback('changeGender', function(gender, cb)
  previewPed(nil, gender)
  cb({ 'ok' })
end)

RegisterNetEvent('qbx_core:client:playerLoggedOut', function()
  if GetInvokingResource() then return end
  chooseCharacter()
end)

CreateThread(function()
  while true do
    Wait(0)
    if NetworkIsSessionStarted() then
      pcall(function() exports.spawnmanager:setAutoSpawn(false) end)
      Wait(2000) -- make sure client is finishing loaded
      init()
      Wait(1000)
      chooseCharacter()
      break
    end
  end
end)

if config.setPedVisible then
  CreateThread(function()
    while setPedVisible do
      SetPlayerVisibleLocally(PlayerId(), true)
      Wait(5)
      if not onMenu then
        destroyPreviewCam()
        ClearPedTasksImmediately(PlayerPedId())
        break
      end
    end
  end)
end
