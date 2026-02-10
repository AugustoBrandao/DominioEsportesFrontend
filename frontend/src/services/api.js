import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dominio-esportes-backend:3100',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;