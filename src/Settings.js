const sketch = require('sketch')

const { UI } = sketch

const {
  API_KEY,
  setNewDefaultCollection,
  defaultCollectionID,
  setApiKey,
  getApiKey,
  cleanString
} = require('./utils')

// Collection Settings
export function onCollectionSetup (context) {
  var newCollection = cleanString(UI.getStringFromUser('Collection ID', `${defaultCollectionID}`))

  if (newCollection !== 'null') {
    setNewDefaultCollection(newCollection)
  }
}

export function onCollectionRestore (context) {
  setNewDefaultCollection(defaultCollectionID, true)
  UI.message('⚙️ Random Source: Restored Successfully!')
}

// API Key Settings
export function onSetNewApiKey (context) {
  var newApiKey = cleanString(UI.getStringFromUser('API KEY', getApiKey()))

  if (newApiKey !== 'null' && newApiKey) {
    setApiKey(newApiKey)
    UI.message('⚙️ API KEY: Configured.')
  }
}

export function onRestoreApiKey (context) {
  setApiKey(API_KEY)

  UI.message('️️⚙️ API KEY: Restored successfully!')
}
