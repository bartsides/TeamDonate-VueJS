import store from '@/store';
import authHttpClient from './authHttpClient';
import profileService from './profileService';

const loginErrorMsg = 'Unable to log in. Please try again.';

function handleAuthResult(res) {
  if (!res || !res.accessToken) return;
  // Authenticate with Azure
  authHttpClient
    .post('facebook', JSON.stringify({ access_token: res.accessToken }))
    .then((res) => {
      if (res && res.status == 200 && res.data) {
        // Successfully logged in with Facebook
        store.dispatch('setLoginType', 'Facebook');
        store.dispatch('setToken', res.data.authenticationToken);
        const profileId = res.data.user.userId;
        profileService.getProfile(
          (state, profileId) => {
            // If profile doesn't exist, get basic details from facebook and create new profile
            if (!state.profile.email) createProfile(profileId);
          },
          store.state,
          profileId
        );
      } else {
        store.dispatch('error', loginErrorMsg);
      }
      store.dispatch('setProfileLoggingInFacebook', false);
    })
    .catch(() => {
      store.dispatch('setProfileLoggingInFacebook', false);
      store.dispatch('error', loginErrorMsg);
    });
}

function createProfile(id) {
  window.FB.api('/me', 'GET', { fields: 'id,name' }, function (res) {
    profileService.createProfile({
      id: id,
      name: res.name,
      loginType: 'Facebook',
    });
  });
}

export default {
  initSdk() {
    return new Promise((resolve) => {
      // wait for facebook sdk to initialize before starting the vue app
      window.fbAsyncInit = function () {
        const FB = window.FB;
        FB.init({
          appId: process.env.VUE_APP_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v11.0',
        });

        // auto authenticate with the api if already logged in with facebook
        FB.getLoginStatus(({ authResponse }) => {
          if (authResponse) handleAuthResult(authResponse);
          else store.dispatch('setProfileLoggingInFacebook', false);
          resolve();
        });
        resolve();
      };

      // load facebook sdk script
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  },
  async login() {
    store.dispatch('setProfileLoggingInFacebook', true);
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(FB.login);
    if (authResponse) handleAuthResult(authResponse);
    store.dispatch('setProfileLoggingInFacebook', false);
  },
  logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
  },
};
