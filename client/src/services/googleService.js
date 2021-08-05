import store from '@/store';
import authHttpClient from './authHttpClient';
import profileService from './profileService';

const loginErrorMsg = 'Unable to log in. Please try again.';

function handleAuthResult(authResponse, callback) {
  if (!authResponse || !authResponse.id_token) return;
  // Authenticate with Azure
  authHttpClient
    .post('google', JSON.stringify({ id_token: authResponse.id_token }))
    .then((res) => {
      if (res && res.status == 200 && res.data) {
        // Successfully logged in with Google
        store.dispatch('setLoginType', 'Google');
        store.dispatch('setToken', res.data.authenticationToken);

        const profileId = res.data.user.userId;
        profileService.getProfile(callback, store.state, profileId);
      } else {
        store.dispatch('error', loginErrorMsg);
      }
      store.dispatch('setProfileLoggingInGoogle', false);
    })
    .catch(() => store.dispatch('error', loginErrorMsg));
}

function createProfile(user, id) {
  const basicProfile = user.getBasicProfile();
  profileService.createProfile({
    id: id,
    name: basicProfile.getName(),
    email: basicProfile.getEmail(),
    loginType: 'Google',
  });
}

var gAuth = null;

export default {
  async initSdk(client) {
    gAuth = client;
    if (gAuth.isAuthorized) {
      handleAuthResult(gAuth.GoogleAuth.currentUser.get().getAuthResponse());
    } else {
      store.dispatch('setProfileLoggingInGoogle', false);
    }
  },
  async login() {
    store.dispatch('setProfileLoggingInGoogle', true);
    const user = await gAuth.signIn();
    const success = (state, profileId) => {
      // If profile doesn't exist, get basic details from Google and create new profile
      if (!state.profile.email) createProfile(user, profileId);
    };
    handleAuthResult(user.getAuthResponse(), success);
  },
  async logout() {
    await gAuth.signOut();
  },
};
