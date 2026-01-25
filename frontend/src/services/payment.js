import api from './api';

const payments = {
  async pix() {
    const response = await api.post('/criar-pix', {
      amount: 100.0,
      userEmail: 'augustobrandao.99@outlook.com',
    });

    return response.data;
  },
};

export default payments;