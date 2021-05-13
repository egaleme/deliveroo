import axios from 'axios';

const BaseURL = 'https://mock-api-mobile.dev.lalamove.com/v2';

const instance = axios.create({
  baseURL: BaseURL,
  timeout: 120000,
});

export const api = {
  getDeliveries: offset =>
    instance({
      method: 'GET',
      url: '/deliveries',
      params: {
        offset: offset,
        limit: 20,
      },
    }),
};
