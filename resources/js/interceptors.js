import axios from 'axios';
import store from './store'

export default function setup() {
    axios.interceptors.request.use(function (config) {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(error) {
        return Promise.reject(error);
    });
}
