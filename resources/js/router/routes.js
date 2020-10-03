import MainPage from '../components/main-page.vue'
import Login from '../components/login.vue'
import Register from '../components/registration.vue'
import PageNotFound from '../components/page-not-found.vue'

import store from '../store/index.js'

export default [
    { 
        path: '/',
        name: 'main-page',
        component: MainPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next ({
                    name: 'login'
                })
            }  else next()
        }
    },
    { 
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next ({
                    name: 'main-page'
                })
            } else next()
        }
    },
    { 
        path: '/registration',
        name: 'registration',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next ({
                    name: 'main-page'
                })
            } else next()
        }        
    },
    {
        path: "/page-not-found",
        alias: '*',
        component: PageNotFound
    }
];
