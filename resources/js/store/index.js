import { createStore } from 'vuex'
import * as auth from './modules/auth'
import * as tasks from './modules/tasks'
import * as categories from './modules/categories'

export const store = createStore({
    modules: {
        auth,
        tasks,
        categories
    }
})
