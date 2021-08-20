import httpClient from './httpClient';
import publicHttpClient from './publicHttpClient';

export default {
  getTeam(eventid, teamid) {
    return publicHttpClient.get(`GetTeam/${eventid}/${teamid}`, {
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
  joinTeam({teamId, teamPk, user}) {
    return httpClient.post(`JoinTeam/${teamPk}/${teamId}`, user, {
      headers: { 'x-functions-key': process.env.VUE_APP_JOIN_TEAM}
    });
  }
};
