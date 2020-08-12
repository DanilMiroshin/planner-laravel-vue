require('./bootstrap');

window.Vue = require('vue');

Vue.component('tasks-page', require('./components/Task.vue').default);

const app = new Vue({
    el: '#app'
});
