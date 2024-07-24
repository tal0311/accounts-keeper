<template>
    <section class="account-view">

        <AccountList v-if="accounts" :accounts="accounts" @removeAccount="remove" />
        <AppLoader v-else v-for="i in  5"  :key="i" type="list"/>

    </section>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import AccountList from '@/components/AccountList.vue'
import AppLoader from '@/components/AppLoader.vue'
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service';


const accountStore = useAccountStore()

const accounts = computed(() => accountStore.getAccounts)


onBeforeMount(() => {
    loadAccounts()
})

async function loadAccounts() {
    try {

        await accountStore.loadAccounts()
        showSuccessMsg('Accounts loaded successfully', 'success')
    } catch (error) {
        showErrorMsg('Error loading accounts', 'error')

    }
}

function remove(accountId) {
    console.log('remove account', accountId);
    accountStore.removeAccount(accountId)
}

</script>



<style scoped>
.account-view {
    display: grid;
    gap: 1rem;
    margin-block-start: 1rem;
    /* background-color: aqua; */

    .loader {
        display: grid;
        place-items: center;
        height: 70vh;
        background-color: aqua;
    }

}
</style>