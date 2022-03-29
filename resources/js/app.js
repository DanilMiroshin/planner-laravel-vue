import { createApp } from 'vue'
import { store } from './store'
import router from './router';

require('./store/subscriber')
require('./bootstrap');

createApp({}).use(router).use(store).mount('#app')


/*store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    const app = new Vue();
})*/


