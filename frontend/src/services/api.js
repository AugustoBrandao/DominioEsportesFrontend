import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dominio-esportes-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;