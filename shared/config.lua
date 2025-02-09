return {
  maxCharacter = 4,                                             -- Set maximum character in identifier/lisence
  setPedVisible = true,                                         -- Set visible ped when in menu
  spawnAtLastLocation = true,                                   -- If set to true, skips choice spawn points (requires qbx_spawn if true)
  startingApartment = false,                                    -- If set to false, skips apartment choice in the beginning (requires qbx_spawn if true)
  enableDeleteButton = true,                                    -- Whether players should be able to delete characters themselves.
  loadingModelsTimeout = 30000,                                 -- Waiting time for ox_lib to load the models before throws an error, for low specs pc
  defaultSpawn = vec4(-269.1097, -955.7875, 31.2231, 208.5021), -- Default spawn position
  dateFormat = 'dd/MM/yyyy',                                    -- 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy'
  dateMin = '1900-01-01',                                       -- Use format yyyy-mm-dd
  dateMax = '2010-12-31',                                       -- Use format yyyy-mm-dd
  profanityWords = {                                            -- Blacklisted words for name creation
    'bad word',
    'roleplay'
  },
}
