import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
// import { accountService } from '@/services/item.service.local'
import { accountService } from '@/services/item.service'
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service'

export const useAccountStore = defineStore('account', () => {
  const accountList = ref(null)
  const filterBy = ref({
    txt: '',
    type: '',
    sortBy: {
      key: 'name',
      order: 1
    }
  })

  const getAccounts = computed(() => {
    return accountList.value
  })

  async function loadAccounts() {
    accountList.value = await accountService.query(filterBy.value)
  }

  async function removeAccount(accountId) {

    try {

      accountList.value = accountList.value.filter(account => account._id !== accountId)
      await accountService.remove(accountId)
      showSuccessMsg('Account removed successfully')
    } catch (error) {
      showErrorMsg('Failed to remove account')
      console.error('error removing account')
      loadAccounts()
    }

  }

  function setFilter(key, value) {
    filterBy.value[key] = value
  }

  watchEffect(() => {
    if (filterBy.value) {
      loadAccounts()
    }
  })

  return { getAccounts, loadAccounts, setFilter, removeAccount }
})
