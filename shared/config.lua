return {
  locale = 'en',
  setPedVisible = true,
  spawnAtLastLocation = true,
  defaultSpawn = vec4(-269.1097, -955.7875, 31.2231, 208.5021),
  maxCharacter = 1,
  loadingModelsTimeout = 30000, -- Waiting time for ox_lib to load the models before throws an error, for low specs pc

  startingApartment = false,
  enableDeleteButton = false, -- Whether players should be able to delete characters themselves.

  dateFormat = 'dd/MM/yyyy',  --- 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy'
  dateMin = '1900-01-01',     -- Has to be in the same format as the dateFormat config
  dateMax = '2006-12-31',     -- Has to be in the same format as the dateFormat config

  profanityWords = {
    'bad word',
    'roleplay'
  },
}
