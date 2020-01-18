import axios from 'axios';

// https://devfinderapi.herokuapp.com/
// http://localhost:3333

const api = axios.create({
    baseURL: 'https://devfinderapi.herokuapp.com'
});

export default api;