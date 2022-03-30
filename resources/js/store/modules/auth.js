import axios from 'axios'

export default {
    state:() => ({
        token: null,
        user: null,
    }),

    getters: {
        user: (state) => state.user,
        authenticated: (state) => state.token && state.user,
    },

    mutations: {
        setUser: (state, user) => state.user = user,
        setToken: (state, token) => state.token = token,
    },

    actions: {
        registration({ commit }, user) {
            return axios.post('api/v1/auth/register', user).then((response) => {
                commit('setUser', response.data)
            });
        },

        async login({ dispatch }, user) {
            return await axios.post('api/v1/auth/login', user).then((response) => {
                dispatch('processLogin', response.data.token);
            });
        },

        async processLogin({ commit, getters }, token) {
            commit('setToken', token)

            if (!getters.user) {
                return await axios.get('api/v1/auth/me', {
                    headers : {
                        'Authorization': 'Bearer' + token
                    }
                }).then((response) => {
                    commit('setUser', response.data)
                });
            }
        },

        signOut({ commit }) {
            return axios.post('api/v1/auth/logout').then(() => {
                commit('setToken', null)
                commit('setUser', null)
            })
        }
    }
}
