import Page from '../components/main/layout/LayoutPage'
import Login from '../components/auth/AuthLogin'
import Register from '../components/auth/AuthRegistration'
import PageNotFound from '../components/PageNotFound'
import TasksPage from '../components/main/tasks/TasksPage'
import SettingsPage from '../components/main/settings/SettingsPage'

import store from '../store'


function isAuthenticated(to, from, next) {
    const isAuthRoute = ['login', 'registration'].includes(to.name);

    if (store.getters.authenticated) {
        return isAuthRoute ? next({ name: 'tasks' }) : next();
    }

    return isAuthRoute ? next() : next({ name: 'login' });
}

export default [
    {
        path: '/',
        component: Page,
        beforeEnter: [isAuthenticated],
        children: [
            {
                name: 'tasks',
                path: '',
                component: TasksPage
            },
            {
                path: 'settings',
                name: 'settings',
                component: SettingsPage
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: [isAuthenticated],
    },
    {
        path: '/registration',
        name: 'registration',
        component: Register,
        beforeEnter: [isAuthenticated],
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: PageNotFound,
        meta: {
            requiresAuth: false
        }
    }
];
