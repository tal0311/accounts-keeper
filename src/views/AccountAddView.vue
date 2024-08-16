<template>

    <section v-if="account" class="add-edit-view grid">

        <h2>{{ id ? 'Update Account' : 'Add Account' }}</h2>


        <form  @submit.stop="" class="">

            <div class="fields-container grid">

                <label v-for="field, idx in accountFields" :key="idx">
                    {{ getFieldLabel(field) }}
                    <input type="text" v-model="account[field]">
                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Created At</th>
                        <th>Type</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in account.history" :key="item.id">
                        <td>{{ item.createdAt }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.details }}</td>
                    </tr>
                </tbody>
            </table>

        </form>

        <button class="primary-btn" @click="handlePassGen">{{ btnState }}</button>

        <section v-if="isGenOpen" class="grid">
            <h2>Generate Password</h2>

            <div class="pass-fields grid">

                <label for="length">
                    Length
                    <input type="number" id="length" v-model="length">
                </label>

                <label for="includeSymbols">
                    Include Symbols
                    <input type="checkbox" id="includeSymbols" v-model="includeSymbols">
                </label>

                <label for="includeNumbers">
                    Include Numbers
                    <input type="checkbox" id="includeNumbers" v-model="includeNumbers">
                </label>

                <label for="includeUppercase">
                    Include Uppercase
                    <input type="checkbox" id="includeUppercase" v-model="includeUppercase">

                </label>

                <label for="includeLowercase">
                    Include Lowercase
                    <input type="checkbox" id="includeLowercase" v-model="includeLowercase">
                </label>

            </div>

            <input class="pass-results" type="text" v-model="pass" placeholder="Your password will displayed here">
            <div class="action-container">

                <button class="primary-btn" @click="generatePassword">Generate</button>
                <button class="primary-btn" @click="updatePasswd">Update</button>
            </div>

        </section>
    </section> 

    <AppLoader v-else type="edit"/>

</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useRoute , useRouter} from 'vue-router'
// import { accountService } from '@/services/item.service.local'
import { accountService } from '@/services/item.service'
import { eventBus, showSuccessMsg } from '@/services/event-bus.service'
import { utilService } from '@/services/util.service'
import AppLoader from '@/components/AppLoader.vue'


const route = useRoute()
const router = useRouter()

const id = ref(route.params.id)

const isGenOpen = ref(false)

let account = ref(null)

const btnState = ref('Update Password')

const length = ref(8)
const includeSymbols = ref(false)
const includeNumbers = ref(false)
const includeUppercase = ref(true)
const includeLowercase = ref(true)

const pass = ref('')

const accountFields = ref(null)

watchEffect(() => {
    if (isGenOpen.value) {
        btnState.value = 'Update Password'
    }
    else {
        btnState.value = 'Generate Password'
    }

    if (account.value) {
        accountFields.value = Object.keys(account.value)
            .filter(field => field !== '_id' && field !== 'history')
    }

})

function handlePassGen() {
    isGenOpen.value = !isGenOpen.value


}

function getFieldLabel(field) {
    return field.split(/(?=[A-Z])/).join(' ')
}

function generatePassword() {
    let password = ''
    for (let i = 0; i < length.value; i++) {
        let char = ''
        if (includeSymbols.value) {
            char += '!@#$%^&*()_+'
        }
        if (includeNumbers.value) {
            char += '1234567890'
        }
        if (includeUppercase.value) {
            char += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }
        if (includeLowercase.value) {
            char += 'abcdefghijklmnopqrstuvwxyz'
        }
        password += char.charAt(Math.floor(Math.random() * char.length))
    }

    pass.value = password
}

function updatePasswd() {
    account.value.password = pass.value
}


onBeforeMount(async () => {


    eventBus.on('main-action', async (btnState) => {
        if (btnState === 'save') {
            createAccountHistory()
            await accountService.save(account.value)
            showSuccessMsg('Account updated successfully')
            router.push('/account')

        }

    })
    eventBus.emit('main-action', 'Save')

    if (id.value) {
        account.value = await accountService.getById(id.value)
    }
    else {
        account.value = {
            accountTitle: '',
            type: '',
            icon: '',
            history: [],
            username: '',

            otherField: '',
            notes: ''
        }

    }

})

function createAccountHistory() {
    if (!account.value.history) account.value.history = []
    account.value.history.push({
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: id.value ? 'updated' : 'created',
        details: id.value ? 'account updated' : 'account created'
    })
}

</script>

<style scoped>
.add-edit-view {
    .primary-btn {
        padding: 0.5rem 1rem;
    }
}

label {
    text-transform: capitalize;
}

.fields-container {
    gap: 0.2rem;

    label,
    input {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        font-size: 1.2rem;
    }
}

.pass-fields {
    gap: 0.5rem;

    label {
        font-size: 1.2rem;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        align-items: center;
    }
    input[type="checkbox"] {
        font-size: 1.2rem;   
        height: 1.2rem;
    }
    input[type="text"] {
        font-size: 1.2rem;
        padding: 1.5rem;
    }
}

.action-container {
    margin-block: 1rem;
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
}


table {
    width: 100%;
    text-align: justify;
    padding: 1rem 0;

    tr,
    th,
    td {
        border: 1px solid #ccc;
        padding: 0.5rem;
    }
}

.pass-results {
    margin-block: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;
}
</style>