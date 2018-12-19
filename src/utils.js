export const API_KEY = 'bfd993ac8c14516588069b3fc664b216d0e20fb9b9fa35aa06fcc3ba6e0bc703'
export const defaultCollectionID = 317099

const { Settings, UI } = require('sketch')

export function getApiKey (fallback = API_KEY) {
  const key = Settings.settingForKey('api key')

  return key || fallback
}

export function setApiKey (newKey) {
  Settings.setSettingForKey('api key', newKey.replace(/\s+/, '').toLowerCase())
}

export function cleanString (str) {
  return str.replace(/\s+/, '').toLowerCase()
}

export function setNewDefaultCollection (collectionID = defaultCollectionID, skipCheck = false) {
  if (skipCheck) {
    Settings.setSettingForKey('collection.id', collectionID)
    return
  }

  UI.message('🕑 Please wait…')

  fetch(`https://api.unsplash.com/collections/${collectionID}?client_id=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      Settings.setSettingForKey('collection.id', data.id)
      Settings.setSettingForKey('collection.title', data.title)

      UI.message(`🎉 "${data.title}" is the new default 'Random Source'.`)
    })
    .catch(error => {
      console.error(error)
      UI.message('👎 Error: Invalid Collection ID.')
    })
}

export function getDefaultCollection () {
  const id = Settings.settingForKey('collection.id')
  return id !== undefined ? id : defaultCollectionID
}
