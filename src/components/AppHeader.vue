<template>
    <header v-if="isFilterDisplayed" class="app-header">
        <section class="filter grid">
            <form @submit.prevent="onSearch">
                <input type="search" name="txt" placeholder="Find anything" />
                <button type="submit" class="primary-btn" @submit.prevent="">Search</button>
            </form>
            
            <section class="type-filter grid grid-dir-cols">
                <button v-for="btn, idx in btns" :key="btn.name"
                    :class="[btn.isSelected ? 'selected' : '', 'primary-btn']" @click="onSelect(idx)">
                    <span> {{ btn.name }}</span>
                    <span> ({{ btn.count }})</span>
                </button>
            </section>
        </section>

    </header>
</template>

<script setup>

import { computed, ref, onBeforeMount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '@/stores/accountStore';
import { socketService, ON_TYPES } from '@/services/socket.service';

const accountStore = useAccountStore()
const route = useRoute()

const btns = ref(null)
onBeforeMount(() => {

    socketService.on(ON_TYPES, (types) => {
        types = Object.entries(types).map(([key, value]) => {
            return { name: key, isSelected: false, count: value, isLoading: false }
        })
        btns.value = [...types]
        btns.value.unshift({ name: 'all', isSelected: true, count: types.length })
        
    })
    
})



// To preserve the All value
watchEffect(() => {
    if (btns.value) {
        socketService.off(ON_TYPES)
       
    }
})





const onSelect = (idx) => {

    btns.value.forEach((btn, index) => {
        if (idx === index) {
            btn.isSelected = true

        } else {
            btn.isSelected = false

        }


    })

    accountStore.setFilter('type', btns.value[idx].name)


}

function onSearch($event) {
    const data = Object.fromEntries(new FormData($event.target))
    accountStore.setFilter('txt', data.txt)
}

const isFilterDisplayed = computed(() => {
    const routes = ['account']
    return routes.includes(route.name)
})
</script>

<style scoped>
.app-header {
    margin-block-start: 1rem;
    padding: 1rem;
    outline: 1px solid var(--clr1);
    border-radius: var(--br);

}

.filter {
    gap: 1rem;
    align-items: center;

}

form {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 0.2fr;
    gap: 1rem;


    input {
        padding: 0.5rem;
        border-radius: var(--br);
    }
}

.type-filter {
    min-height: 1rem;

    width: min-content;
    gap: 1rem;

    button {
        grid-auto-flow: column;
        padding: 0.5rem 1rem;
        gap: 0.2rem;

        span:first-child {
            text-transform: capitalize;
        }

        &.selected {
            opacity: 0.5;
            
        }
    }
}
</style>