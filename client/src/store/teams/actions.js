import teamService from '@/services/teamService';
import store from '@/store';

export default {
  getTeams({ commit }, eventid) {
    return teamService.getTeams(eventid).then((res) => {
      console.log('Get Teams', res);
      return res?.data ?? [];
    });
  },
  registerTeam({ commit }, data) {
    return teamService.registerTeam(data).then((res) => {
      if (!res || res.status != 200) return false;
      const profile = store.getters.profile;
      if (!profile.teams) profile.teams = [];
      profile.teams.push({ id: data.id, name: data.name });
      return store.dispatch('updateProfile', profile);
    });
  },
};
