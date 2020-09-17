import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        }
    },

    mutations: {
        set_token (state, token) {
            state.token = token
        },

        set_user (state, data) {
            state.user = data
        }
    },

    actions: {
        async login ( { dispatch }, credentials) {
            let response = await axios.post('api/v1/auth/login', credentials)

            return dispatch('attempt', response.data.token);
        },

        async attempt ( { commit }, token) {
            commit('set_token', token)

            try {
                let response = await axios.get('api/v1/auth/me', {
                    headers : {
                        'Authorization': 'Bearer' + token
                    }
                })

                commit('set_user', response.data)
            } catch(e) {
                commit('set_token', null)
                commit('set_user', null)   
            }
        }
    }
}
