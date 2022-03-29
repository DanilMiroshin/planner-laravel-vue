import MainPage from '../components/main/layout/LayoutPage.vue'
import Login from '../components/auth/AuthLogin.vue'
import Register from '../components/auth/AuthRegistration.vue'
import PageNotFound from '../components/PageNotFound.vue'
import TasksCrud from '../components/main/tasks/TasksPage.vue'
import Settings from '../components/main/settings/SettingsPage.vue'

import { store } from '../store'

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
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: PageNotFound,
        meta: {
            requiresAuth: false
        }
    }
];
