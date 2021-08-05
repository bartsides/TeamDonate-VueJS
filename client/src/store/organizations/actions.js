import organizationService from '@/services/organizationService';
import store from '@/store';

export default {
  getOrganization({ commit }, id) {
    return organizationService.getOrganization(id).then((res) => {
      return res?.data;
    });
  },
  getOrganizations({ commit }) {
    organizationService.getOrganizations().then((res) => {
      commit('storeOrganizations', res && res.data ? res.data : []);
    });
  },
  createOrganization({ commit }, org) {
    return organizationService.createOrganization(org).then((res) => {
      if (res?.status != 200) return false;

      if (store.getters.organizations?.length)
        store.getters.organizations.push(org);

      const profile = store.getters.profile;
      if (!profile.organizations) profile.organizations = [];
      profile.organizations.push({ id: org.id, name: org.name });
      return store.dispatch('updateProfile', profile);
    });
  },
  updateOrganization({ commit }, org) {
    return organizationService.updateOrganization(org).then((res) => {
      return res.status == 200;
    });
  },
};
