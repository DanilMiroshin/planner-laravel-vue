import axios from 'axios'
import store from '../store'

store.subscribeAction((action, state) => {
    switch (action.type) {
        case 'tasks/loadTasks': 
        case 'tasks/makeTask': 
        case 'tasks/destroyTask': 
        case 'tasks/updateTask':
        case 'tasks/toggleTask':
            axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
        break;
    }
})
