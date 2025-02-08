if not lib then return end

local config = require 'shared.config'
local defaultSpawn = require 'shared.config'.defaultSpawn
local randomPeds = require('shared.randomPeds')

local previewCam
local onRegistered = false
local cidNewCharacter

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
      assets = 'nui://zx_multicharacter/web/assets',
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
end

local function setupPreviewCam()
  DoScreenFadeIn(1000)

  local cameras = {
    vec3(0, 2.2, 0.2),
    vec3(0, 0, -0.05),
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

local function randomPed()
  local ped = randomPeds[math.random(1, #randomPeds)]
  lib.requestModel(ped.model, config.loadingModelsTimeout)
  SetPlayerModel(cache.playerId, ped.model)
  pcall(function() exports['illenium-appearance']:setPedAppearance(PlayerPedId(), ped) end)
  SetModelAsNoLongerNeeded(ped.model)
end

local function previewPed(citizenId)
  if not citizenId then
    randomPed()
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
end

local function createCharacter()
  previewPed()

  if not onRegistered then
    onRegistered = true

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

  local position = characters[1] and characters[1].position or config.locations[1].pedCoords

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

  for i = 1, amount do
    local character = characters[i]
    if character then
      options[i] = {
        charId = character.citizenid,
        firstName = character.charinfo.firstname,
        lastName = character.charinfo.lastname,
        dob = character.charinfo.birthdate,
        national = character.charinfo.nationality,
        sex = character.charinfo.gender == 0 and 'Male' or "Female",
        job = character.job.label,
        jobGrade = character.job.grade.name,
        coords = character.position,
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
    SetNuiFocus(true, true)
    SendNUIMessage({
      action = 'openUI',
      data = {
        playerId = cache.playerId,
        characters = options
      }
    })
  end
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
    firstname = data.firstlame,
    lastname = data.firstlame,
    nationality = data.nationality,
    gender = data.gender == locale('char_male') and 0 or 1,
    birthdate = data.birthdate,
    cid = cidNewCharacter
  })

  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })

  destroyPreviewCam()
  onRegistered = false
  cidNewCharacter = nil

  Wait(250)

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
  previewPed(char.charId)
  cb({ 'ok' })
end)

RegisterNUICallback("spawnCharacter", function(char, cb)
  DoScreenFadeOut(1000)

  while not IsScreenFadedOut() do
    Wait(0)
  end

  lib.callback.await('qbx_core:server:loadCharacter', false, char.charId)

  destroyPreviewCam()

  pcall(function()
    exports.spawnmanager:spawnPlayer({
      x = char.coords.x,
      y = char.coords.y,
      z = char.coords.z,
      heading = char.coords.w
    })
  end)

  TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
  TriggerEvent('QBCore:Client:OnPlayerLoaded')
  TriggerServerEvent('qb-houses:server:SetInsideMeta', 0, false)
  TriggerServerEvent('qb-apartments:server:SetInsideMeta', 0, 0, false)

  FreezeEntityPosition(cache.ped, false)
  DisplayRadar(true)

  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })

  DoScreenFadeIn(1000)

  while not IsScreenFadedIn() do
    Wait(0)
  end

  cb({ "ok" })
end)

RegisterNUICallback("createNewCharacter", function(data, cb)
  cidNewCharacter = data.cid
  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })
  createCharacter()
  cb({ "ok" })
end)

RegisterNUICallback("deleteCharacter", function(char, cb)
  TriggerServerEvent('qbx_core:server:deleteCharacter', char.charId)
  SetNuiFocus(false, false)
  SendNUIMessage({ action = 'closeNui' })
  destroyPreviewCam()
  chooseCharacter()
  cb({ "ok" })
end)

RegisterNUICallback('uiLoaded', function(_, cb)
  print('Loaded NUI Successfully')
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
      Wait(250)
      init()
      Wait(250)
      chooseCharacter()
      break
    end
  end
end)
