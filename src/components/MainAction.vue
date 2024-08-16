<template>
    <footer :class="`app-footer ${btnText}`">
        <button @click="mainAction" v-html="$svg(btnText)" aria-label="Main Action Button" :title="btnText">
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
    if (route.name === 'login') {
        btnText.value = 'login'
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
    if (route.name === 'login') {
        eventBus.emit('login')
    }

}



</script>

<style scoped>
.app-footer {
    --start: #67C23A;
    --add: #409EFF;
    --copy: #E6A23C;
    --login: #F56C6C;

    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    color: white;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    border-radius: var(--br);

    &.start {
        outline: 1px solid var(--start);

        button {
            background-color: var(--start);
            border: none;
            padding: 0.5rem;
            border-radius: var(--br);

        }

    }

    &.add {
        outline: 1px solid var(--add);

        button {
            background-color: var(--add);
            border: none;
            padding: 0.5rem;
            border-radius: var(--br);
        }
    }

    &.copy {
        outline: 1px solid var(--copy);

        button {
            background-color: var(--copy);
            border: none;
            padding: 0.5rem;
            border-radius: var(--br);
        }
    }


    &.login {
        outline: 1px solid var(--login);

        button {
            background-color: var(--login);
            border: none;
            padding: 0.5rem;
            border-radius: var(--br);
        }
    }
}
</style>