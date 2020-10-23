import axios from 'axios'

export default {
    namespaced: true,

    actions: {

        async loadCategories ( {_} ) {
            return await axios.get('api/v1/category')
        },

        async makeCategory( {_}, category) {
            return await axios.post('api/v1/category/', {
                'name': category.name
            })
        },

        async destroyCategory( {_}, category_id) {
            return await axios.delete('api/v1/category/' + category_id)
        }
    }
}
