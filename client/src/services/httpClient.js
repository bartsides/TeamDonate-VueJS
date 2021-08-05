import axios from 'axios';
import store from '@/store';

const httpClient = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  baseURL: process.env.VUE_APP_BASE_URL,
});

// Http client configuration
httpClient.interceptors.request.use(function (request) {
  var token = store.state.token;
  if (token) {
    request.headers['X-ZUMO-AUTH'] = token;
  }
  return request;
});

// TODO: Implement refresh azure token with error interceptor

export default httpClient;
