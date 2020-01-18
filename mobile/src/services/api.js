import axios from 'axios';

// https://devfinderapi.herokuapp.com/

const api = axios.create({
    baseURL: 'http://192.168.0.28:3333'
});

export default api;