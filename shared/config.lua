return {
  locale = 'en',
  defaultSpawn = vec4(-540.58, -212.02, 37.65, 208.88),
  maxCharacter = 4,
  randomLocation = true,
  loadingModelsTimeout = 30000, -- Waiting time for ox_lib to load the models before throws an error, for low specs pc

  startingApartment = false,
  useExternalCharacters = false, -- Whether you have an external character management resource. (If true, disables the character management inside the core)
  enableDeleteButton = true,     -- Whether players should be able to delete characters themselves.

  dateFormat = 'dd/MM/yyyy',     --- 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy'
  dateMin = '1900-01-01',        -- Has to be in the same format as the dateFormat config
  dateMax = '2006-12-31',        -- Has to be in the same format as the dateFormat config

  profanityWords = {
    'bad word',
    'roleplay'
  },

  locations = { -- Spawn locations for multichar, these are chosen randomly
    {
      pedCoords = vector4(-1008.49, -474.51, 50.03, 208.64),
      camCoords = vector4(-1005.53, -480.73, 50.52, 27.44),
    },
  },
}
