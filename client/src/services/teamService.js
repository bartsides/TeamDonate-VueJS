import httpClient from './httpClient';
import publicHttpClient from './publicHttpClient';

export default {
  getTeam(id) {
    return publicHttpClient.get(`GetTeam/${id}`, {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_TEAM },
    });
  },
  getTeams(eventid) {
    return publicHttpClient.get(`GetTeams/${eventid}`, {
      headers: { 'x-functions-key': process.env.VUE_APP_GET_TEAMS },
    });
  },
  registerTeam(team) {
    return httpClient.post(`CreateTeam`, team, {
      headers: { 'x-functions-key': process.env.VUE_APP_CREATE_TEAM },
    });
  },
};
