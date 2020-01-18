import axios from 'axios';

// https://devfinderapi.herokuapp.com/
// http://192.168.0.28:3333

const api = axios.create({
    baseURL: 'https://devfinderapi.herokuapp.com'
});

export default api;