import Vue from 'vue'

import loader from "vue-ui-preloader";
import store from './store/index.js'
import router from './router';

require('./store/subscriber')
require('./bootstrap');

Vue.use(loader);

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    const app = new Vue({
        el: '#app',
        router,
        store: store
    });
})


