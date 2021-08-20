import teamService from '@/services/teamService';
import store from '@/store';

function addTeamToProfile(team) {
  const profile = store.getters.profile;
  if (!profile.teams) profile.teams = [];
  profile.teams.push({ id: team.id, name: team.name });
  return store.dispatch('updateProfile', profile);
}

export default {
  getTeam({ commit }, { eventid, teamid }) {
    return teamService.getTeam(eventid, teamid).then((res) => {
      return res?.data;
    });
  },
  getTeams({ commit }, eventid) {
    return teamService.getTeams(eventid).then((res) => {
      return res?.data ?? [];
    });
  },
  registerTeam({ commit }, data) {
    return teamService.registerTeam(data).then((res) => {
      if (!res || res.status != 200) return false;
      return addTeamToProfile(data);
    });
  },
  joinTeam({ commit }, data) {
    return teamService.joinTeam(data).then((res) => {
      if (!res || res.status != 200) return false;
      return addTeamToProfile(data);
    })
  }
};
