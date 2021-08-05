import axios from 'axios';

const httpClient = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  baseURL: process.env.VUE_APP_PUBLIC_BASE_URL,
});

export default httpClient;
