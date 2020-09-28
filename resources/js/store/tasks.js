import axios from 'axios'

export default {
    namespaced: true,

    state: {
        tasks: []
    },

    getters: {
        getTasks (state) {
            return state.tasks
        }
    },

    mutations: {
        set_tasks (state, tasks) {
            state.tasks = tasks
        }
    },

    actions: {
        async loadTasks ( { commit } ) {
            try {
                let response = await axios.get('api/v1/tasks', {
                    headers : {
                        'Authorization': 'Bearer' + localStorage.getItem('token')
                    }
                })      
                return commit('set_tasks', response.data.data)
            } catch(e) {
                return commit('set_tasks', null) 
            }
        },

        async makeTask( {_}, task) {
            return await axios.post('api/v1/tasks/', {
                'token': localStorage.getItem('token'),
                'description': task.description
            })
        },

        async destroyTask( {_}, task_id) {
            return await axios.delete('api/v1/tasks/' + task_id, {
                'token': localStorage.getItem('token'),
            })
        },

        async updateTask( {_}, task) {
            return await axios.put('api/v1/tasks/' + task.id, {
                'token': localStorage.getItem('token'),
                'description': task.description
            })
        },
    }
}
