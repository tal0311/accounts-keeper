<template>
    <section class="account-list">
        <AccountPreview v-for="account in props.accounts" :key="account.id" :account="account"
            @removeAccount="$emit('removeAccount', $event)" />
    </section>
</template>

<script setup>
import AccountPreview from '@/components/AccountPreview.vue'

defineEmits(['removeAccount'])
const props = defineProps({
    accounts: Array
})
</script>

<style scoped>
.account-list {
    display: grid;
    margin-block-start: 1rem;
    gap: 1rem;

   
}
</style>