import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/funcionarios/'
})

export default api;