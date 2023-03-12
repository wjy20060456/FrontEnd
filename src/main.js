import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router/index'

// Vue.prototype.$axios = axios;


const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.use(VueAxios,axios)
app.mount('#app')
