<template>
    <section v-if="account" class="account-info">
        <p>{{ account.username }}</p>
        <p>{{ account.password }}</p>
        <p>{{ account.otherField }}</p>

    </section>
</template>

<script setup>

import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { accountService } from '@/services/item.service';
import { useRouter } from 'vue-router';
import { showErrorMsg, showSuccessMsg, eventBus } from '@/services/event-bus.service';

const account = ref(null)

const router = useRouter()


function setQuery(accountId) {
    if (!accountId) return router.push({ query: {} })
    router.push({ query: { id: accountId } })
}


onBeforeMount(async () => {
    eventBus.on('copy', () => {
        navigator.clipboard.writeText(account.value.passwordHash)
        showSuccessMsg('Copied to clipboard')

    })
    try {
        setTimeout(async () => {
            account.value = await accountService.getById(props.accountId)
            setQuery(account.value._id)
        }, 1000)
        showSuccessMsg('Make sure to keep your password safe')
    } catch (error) {
        showErrorMsg('Could not load account details')
    }

})

onBeforeUnmount(() => {

    setQuery()
})


const props = defineProps({
    accountId: String
})
</script>