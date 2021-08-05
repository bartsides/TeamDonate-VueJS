import httpClient from './httpClient';
import publicHttpClient from './publicHttpClient';

export default {
  getOrganizations() {
    return publicHttpClient.get('GetOrganizations', {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_ORGANIZATIONS },
    });
  },
  getOrganization(id) {
    return publicHttpClient.get(`GetOrganization/${id}`, {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_ORGANIZATION },
    });
  },
  createOrganization(org) {
    return httpClient.post(`CreateOrganization`, org, {
      headers: { 'x-functions-key': process.env.VUE_APP_CREATE_ORGANIZATION },
    });
  },
  updateOrganization(org) {
    return httpClient.post(`UpdateOrganization/${org.id}`, org, {
      headers: { 'x-functions-key': process.env.VUE_APP_UPDATE_ORGANIZATION },
    });
  },
};
