import store from '@/store';
import profileService from '@/services/profileService';

export default {
  setProfile({ commit }, profile) {
    commit('storeProfile', profile);
  },
  updateProfile({ commit }, profile) {
    return profileService.updateProfile(profile).then((res) => {
      const success = res && res.status == 200;
      if (success) store.dispatch('setProfile', profile);
      return success;
    });
  },
};
