<template>
  <section class="app-container main-layout">
    <AppHeader />
    <main class="router-view">
      <RouterView />
    </main>
    <MainAction />
    <UserMsg />
  </section>
</template>

<script setup>

import UserMsg from '@/components/UserMsg.vue'
import MainAction from '@/components/MainAction.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from './stores/userStore';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()


onBeforeMount(() => {
  userStore.loadUser()

  const user = computed(() => userStore.getLoggedInUser).value

  if (!user) router.push('/login')
})

</script>

<style scoped>
.router-view {
  margin-bottom: 10rem;

}
</style>