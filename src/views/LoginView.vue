<template>
    <section class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button>Login</button>
        </form>
    </section>
</template>

<script setup>

import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'

const credentials = ref({ username: 'tal0311', password: '1234' })
const userStore = useUserStore()

// {
//   "imgUrl":"https://res.cloudinary.com/tal-amit-dev/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1679773600/Instagram/WhatsApp_Image_2023-03-25_at_22.42.55_gh0eyd.jpg",
//   "username":"tal0311",
//   "fullname":"Tal Amit",
//   "password":"1234",
//   "email":"tal.amit0311@gmail.com"
// }

const router = useRouter()

async function login() {

    await userStore.login(credentials.value)

    router.push('/account')
}


</script>

<style scoped></style>