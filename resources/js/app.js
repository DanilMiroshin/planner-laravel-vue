import { createApp } from 'vue'
import store from './store'
import router from './router';
import interceptorsSetup from './interceptors'

require('./bootstrap');
interceptorsSetup()

createApp({}).use(router).use(store).mount('#app')


