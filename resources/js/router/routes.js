import Tasks from '../components/task.vue'
import Login from '../components/login.vue'
import Register from '../components/registration.vue'

import store from '../store/index.js'

export default [
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
];
