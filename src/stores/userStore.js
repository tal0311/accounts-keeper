import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'
import { socketService } from '@/services/socket.service'

export const useUserStore = defineStore('user', () => {
  const loggedUser = ref(null)

  function loadUser() {
    loggedUser.value = userService.getLoggedInUser()
    if (loggedUser.value) {
      socketService.setup()
      return
    }
    
  }

  const getLoggedInUser = computed(() => {
    return loggedUser?.value
  })

  async function login(user) {
    await userService.login(user)
    return loggedUser.value
  }

  return { getLoggedInUser, login, loadUser }
})
