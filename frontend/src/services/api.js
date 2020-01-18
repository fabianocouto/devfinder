import axios from 'axios';

// https://devfinderapi.herokuapp.com/

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;