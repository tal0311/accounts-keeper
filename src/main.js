import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import svgPlugin from './plugins/svgPlugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(svgPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
