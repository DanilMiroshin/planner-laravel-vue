import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'

require('./store/subscriber')
require('./bootstrap');

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
            component:Tasks,
            beforeEnter: (to, from, next) => {
                if (!store.getters['auth/authenticated']) {
                    return next ({
                        name: 'login'
                    })
                }  else {
                    next()
                }
            }
        },
        { 
            path:'/login',
            name: 'login',
            component:Login,
            beforeEnter: (to, from, next) => {
                if (store.getters['auth/authenticated']) {
                    return next ({
                        name: 'tasks'
                    })
                } else {
                    next()
                }
            }
        },
        { 
            path:'/registration',
            name: 'registration',
            component:Register,
            beforeEnter: (to, from, next) => {
                if (store.getters['auth/authenticated']) {
                    return next ({
                        name: 'tasks'
                    })
                } else {
                    next()
                }
            }        
        },
    ],
});

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    const app = new Vue({
        el: '#app',
        router,
        store: store
    });
})


