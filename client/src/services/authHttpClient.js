import axios from "axios";

const authHttpClient = axios.create({
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
  baseURL: process.env.VUE_APP_AZURE_AUTH
});

export default authHttpClient;