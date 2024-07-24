<template>
    <footer class="app-footer">
        <button @click="mainAction" v-html="$svg(btnText)">

        </button>
    </footer>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRouter, useRoute, } from 'vue-router'
import { eventBus } from '@/services/event-bus.service'


const router = useRouter()
const route = useRoute()
const btnText = ref('')


onBeforeMount(() => {
    eventBus.on('main-action', (btnState) => {
        btnText.value = btnState
    })
})


watchEffect(() => {
    if (route.name === 'account-add-edit' && route.params.id) {
        btnText.value = 'save'
        // router.push({ name: 'account' })
    }
    if (route.name === 'account-add-edit' && !route.params.id) {
        btnText.value = 'save'
    }
    if (route.name === 'account') {
        btnText.value = 'add'
    }
    if (route.path === '/') {
        btnText.value = 'start'
    }
    if (route.query.id) {
        btnText.value = 'copy'
    }

})

function mainAction() {

    if (route.path === '/') {
        router.push({ name: 'account' })
    }

    if (route.name === 'account-add-edit') {
        eventBus.emit('main-action', 'save')
    }
    if (route.query.id) {
        eventBus.emit('copy')
        return
    }
    if (route.name === 'account') {
        router.push({ name: 'account-add-edit' })
    }

}



</script>

<style scoped>
.app-footer {
    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    border-radius: var(--br);

    button {
        width: 100%;
        padding: 0.5rem;
        height: 100%;
    }
}
</style>