import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import tasks from './tasks'
import categories from './categories'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },

    mutations: {

    },

    actions: {

    },

    modules: {
        auth,
        tasks,
        categories
    }
})
