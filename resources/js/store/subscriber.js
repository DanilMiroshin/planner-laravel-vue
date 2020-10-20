import axios from 'axios'
import store from '../store'

store.subscribeAction((action, state) => {
    action.type !== ('auth/login' || 'auth/attempt') ?
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
        : 0;
})
