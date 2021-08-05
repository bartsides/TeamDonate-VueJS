import router from '@/router';
import facebookService from '@/services/facebookService';
import googleService from '@/services/googleService';
import microsoftService from '@/services/microsoftService';
import store from '@/store';

export default {
  setToken({ commit }, token) {
    commit('storeToken', token);
  },
  setLoginType({ commit }, loginType) {
    commit('storeLoginType', loginType);
  },
  async logout({ commit }) {
    // TODO: Log out of Azure /.auth/logout
    console.log('Logging out from ' + store.state.loginType);
    commit('resetProfile');
    switch (store.state.loginType) {
      case 'Facebook':
        facebookService.logout();
        break;
      case 'Microsoft':
        await microsoftService.logout();
        break;
      case 'Google':
        await googleService.logout();
        break;
    }
    router.push('/');
  },
  setProfileLoggingInGoogle({ commit }, loggingIn) {
    commit('storeProfileLoggingInGoogle', loggingIn);
  },
  setProfileLoggingInFacebook({ commit }, loggingIn) {
    commit('storeProfileLoggingInFacebook', loggingIn);
  },
  setProfileLoggingInMicrosoft({ commit }, loggingIn) {
    commit('storeProfileLoggingInMicrosoft', loggingIn);
  },
  resetProfileLoggingIn({ commit }) {
    commit('storeResetProfileLoggingIn');
  },
};
