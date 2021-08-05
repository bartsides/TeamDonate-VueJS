import httpClient from './httpClient';
import publicHttpClient from './publicHttpClient';

export default {
  getEvent(id) {
    return publicHttpClient.get(`GetEvent/${id}`, {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_EVENT },
    });
  },
  getEvents() {
    return publicHttpClient.get(`GetEvents`, {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_EVENTS },
    });
  },
  createEvent(event) {
    return httpClient.post(`CreateEvent`, event, {
      headers: { 'x-functions-key': process.env.VUE_APP_CREATE_EVENT },
    });
  },
  updateEvent(event) {
    return httpClient.post(`UpdateEvent/${event.id}`, event, {
      headers: { 'x-functions-key': process.env.VUE_APP_UPDATE_EVENT },
    });
  },
};
