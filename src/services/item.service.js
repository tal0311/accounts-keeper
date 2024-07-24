import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'


export const accountService = {
  query,
  getById,
  save,
  remove,
  getEmptyItem,

}
window.accountService = accountService

// loadItems();

async function query(filterBy = {}) {
  // filtering by text as needed
  let accounts = await httpService.get('account', filterBy)
  return accounts
}


function getById(itemId) {

  return httpService.get(`account/${itemId}`)
}

async function remove(itemId) {
  return await httpService.delete(`account/${itemId}`)
}
async function save(item) {
  var savedItem
  if (item._id) {
    savedItem = await httpService.put(`account/${item._id}`, item)
  } else {
    savedItem = await httpService.post('account', item)
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
