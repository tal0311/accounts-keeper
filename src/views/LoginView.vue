<template>
    <section class="login-container grid">
        <form @submit.prevent="login" class="grid">
            <h1>{{ isLogIng ? 'Just a second' :'Login' }}</h1>
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
        </form>
    </section>
</template>

<script setup>

import { onBeforeMount, ref, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'
import { eventBus } from '@/services/event-bus.service';

const credentials = ref({ username: '', password: '' })
const userStore = useUserStore()

let sub = null
const isLogIng = ref(false) 

onBeforeMount(() => {
    sub = eventBus.on('login', login)
})

const router = useRouter()

async function login() {
    isLogIng.value = true

    await userStore.login(credentials.value)
    isLogIng.value = false
    router.push('/account')
}

onBeforeUnmount(() => {
    sub()
})



</script>

<style scoped>
.login-container {
/* background-color: var(--clr1); */
place-content: center;
height: calc(100vh - 10rem);


form {

    box-shadow: 0 0 10px 0 var(--clr1);
    gap: 1rem;
    padding: 3rem 1.5rem;
    /* background-color: var(--clr2); */
    border-radius: 0.5rem;
    place-content: center;
    h1 {
        text-align: center;
    }
    input {
        padding: 0.5rem;
        border-radius: 0.2rem;
        border: 1px solid var(--clr1);
    }
   

}



    /* background: #e8e8e8;
    position: fixed;
    display: grid;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border-radius: 0.5rem;

    form {
        display: grid;
        grid-template-columns: 10px auto 10px;

        gap: 0.5rem;

        &>* {
            grid-column: 2;
        
        }

    } */
}
</style>