import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

import accounts from './../../data/account.json'

const STORAGE_KEY = 'accounts_DB'

export const accountService = {
  query,
  getById,
  save,
  remove,
  getEmptyItem,
  getGroupsByLabels
}
window.accountService = accountService

// loadItems();

async function query(filterBy = {}) {
  // filtering by text as needed
  console.log('filterBy:', filterBy)

  let accounts = await storageService.query(STORAGE_KEY, filterBy)
  // console.log('accounts:', accounts)
  // filter labels by user settings
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    accounts = accounts.filter((account) => regex.test(account.accountTitle))
  }
  if (filterBy.type && filterBy.type !== 'all') {
    accounts = accounts.filter((account) => account.type === filterBy.type)
  }
  return accounts
}

function getGroupsByLabels(list) {
  const itemMap = list.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = []
    }
    acc[item.type].push(item)
    return acc
  }, {})

  return itemMap
}

function getById(itemId) {
  return storageService.get(STORAGE_KEY, itemId)
  // return httpService.get(`item/${itemId}`)
}

async function remove(itemId) {
  await storageService.remove(STORAGE_KEY, itemId)
  // return httpService.delete(`item/${itemId}`)
}
async function save(item) {
  var savedItem
  if (item._id) {
    savedItem = await storageService.put(STORAGE_KEY, item)
    // savedItem = await httpService.put(`item/${item._id}`, item)
  } else {
    savedItem = await storageService.post(STORAGE_KEY, item)
    // savedItem = await httpService.post('item', item)
  }
  return savedItem
}

function getEmptyItem(name) {
  return {
    id: '',
    name,
    icon: '',
    group: '',
    readMoreURL: 'https://example.com/rice-info',
    color: '',
    isSelected: false
  }
}

// TEST DATA
;(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
})()
