require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'

Vue.use(VueRouter)

import Tasks from './components/task.vue'
import Login from './components/login.vue'
import Register from './components/registration.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { 
            path:'/',
            name: 'tasks',
            component:Tasks
        },
        { 
            path:'/login',
            component:Login
        },
        { 
            path:'/registration',
            component:Register
        },
    ],
});

const app = new Vue({
    el: '#app',
    router,
    store: store
});
