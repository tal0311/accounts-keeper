<template>
    <article class="account-preview grid" @click="isOpen = !isOpen">
        <h2>{{ props.account.accountTitle }}</h2>
        <p>{{ props.account.type || 'No Type' }}</p>
        <p>{{ props.account.notes || 'No Notes Added' }}</p>
        <img :src="getIcon" width="100" height="100" :alt="props.account.accountTitle" @error="getDefaultImg">
        <section class="actions-container grid grid-dir-cols">
            <RouterLink class="primary-btn" :to="{ name: 'account-add-edit', params: { id: props.account._id } }">
                Edit
            </RouterLink>
            <button class="primary-btn" @click.stop="$emit('removeAccount', props.account._id)">Delete Account</button>
        </section>
        <AccountDetails :accountId="props.account._id" v-if="isOpen" />
    </article>

</template>

<script setup>
import { ref, computed } from 'vue'
import AccountDetails from './icons/AccountDetails.vue';

defineEmits(['removeAccount'])

const isOpen = ref(false)

const props = defineProps({
    account: Object
})

const getIcon = computed(() => {

    return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${props.account.icon.toLowerCase()}.svg`

})

function getDefaultImg(e) {
    e.target.src = 'https://via.placeholder.com/400'
}


</script>

<style scoped>
.account-preview {
    position: relative;

    grid-template-columns: 1rem auto 1rem;

    outline: 1px solid #ccc;

    &>* {
        grid-column: 2;

    }

    img {
        position: absolute;
        right: 1rem;
        top: 1rem;
        width: min-content;
    }

}

.actions-container {
    margin-block-end: 1rem;
    justify-content: end;
    gap: 2rem;

    button,
    a {
        padding: 0.5rem 1rem;
    }
}
</style>