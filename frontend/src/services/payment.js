import api from './api';

const payments = {
  async pix() {
    const response = await api.post('/criar-pix', {
      amount: 100.0,
      userEmail: 'augustobrandao.99@outlook.com',
    });

    return response.data;
  },

  async card(body) {
    const response = await api.post('/process_payment', body);
    return response.data;
  },

  async create(body) {
    const response = await api.post('/create', body);
    return response.data;
  },

  async getFiliados() {
    const response = await api.get('/filiados');
    return response.data;
  }
};

export default payments;