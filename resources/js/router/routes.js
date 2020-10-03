import MainPage from '../components/main-page.vue'
import Login from '../components/login.vue'
import Register from '../components/registration.vue'
import PageNotFound from '../components/page-not-found.vue'
import TasksCrud from '../components/tasks-crud.vue'
import Settings from '../components/settings.vue'

import store from '../store/index.js'

export default [
    { 
        path: '/',
        component: MainPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next ({
                    name: 'login'
                })
            }  else next()
        },
        children: [
            {
                name: 'main-page',
                path: '',
                component: TasksCrud
            },
            {
                path: 'settings',
                name: 'settings',
                component: Settings
            },
        ]
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
        },
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
