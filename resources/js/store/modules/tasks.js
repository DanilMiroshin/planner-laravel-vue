import axios from 'axios'

export default {
    namespaced: true,

    actions: {
        async loadTasks ( {_}, category_id) {
            return await axios.get('api/v1/tasks?category_id=' + category_id)
        },

        async makeTask( {_}, task) {
            return await axios.post('api/v1/tasks/', {
                'description': task.description,
                'category_id': task.category_id
            })
        },

        async destroyTask( {_}, task_id) {
            return await axios.delete('api/v1/tasks/' + task_id)
        },

        async updateTask( {_}, task) {
            return await axios.put('api/v1/tasks/' + task.id, {
                'description': task.description
            })
        },

        async toggleTask( {_}, task_id) {
            return await axios.patch('api/v1/tasks/toggle/' + task_id)
        },
    }
}
