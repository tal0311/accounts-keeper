import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service'
const STORAGE_KEY = 'user_DB'
const LOGGED_USER = 'loggedUser'

export const userService = {
  save,
  removeUser,
  login,
  getLoggedInUser,
  signup
}

// createUsers()
window.userService = userService

function getLoggedInUser() {
  let user = utilService.loadFromStorage(LOGGED_USER)
  return user
}

async function save(user) {
  // const err = new Error();
  // console.trace()

  // user = JSON.parse(JSON.stringify(user))

  const method = user._id ? 'put' : 'post'
  const updatedUser = await storageService[method](STORAGE_KEY, user)

  if (updatedUser) {
    // console.log('updatedUser', updatedUser);
    _saveLoggedUser(updatedUser)

    return updatedUser
  }
}

function removeUser(userId) {
  return storageService.remove(STORAGE_KEY, userId)
}

async function login(credentials) {

   const user=await httpService.post('auth/login',credentials)
  _saveLoggedUser(user)
  return user
}

function signup(credentials) {
  const user = storageService.query(STORAGE_KEY)
  if (user.email === credentials.email) {
    throw new Error('Email already exists')
  } else {
    storageService.post(STORAGE_KEY, credentials)
    _saveLoggedUser(credentials)
    return credentials
  }
}

function _saveLoggedUser(user) {
  utilService.saveToStorage(LOGGED_USER, user)
  return user
}

;(async () => {
  //    _saveLoggedUser(gUsers[0])
})()
