import microsoftConfig from '@/config/microsoftConfig';
import store from '@/store';
import * as msal from '@azure/msal-browser';
import authHttpClient from './authHttpClient';
import profileService from './profileService';

const msalInstance = new msal.PublicClientApplication(microsoftConfig);
const loginErrorMsg = 'Unable to log in. Please try again.';

function selectAccount() {
  const accounts = msalInstance.getAllAccounts();
  if (!accounts || !accounts.length) {
    store.dispatch('setProfileLoggingInMicrosoft', false);
    return;
  }
  const account = accounts[0];
  msalInstance.setActiveAccount(account);
  msalInstance
    .acquireTokenSilent(microsoftConfig.loginRequest)
    .then((silentRes) => {
      if (!silentRes || !silentRes.idToken) return;
      // Authenticate with Azure
      authHttpClient
        .post('aad', JSON.stringify({ access_token: silentRes.idToken }), {
          withCredentials: true,
        })
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            // Successfully logged in with Microsoft
            store.dispatch('setLoginType', 'Microsoft');
            store.dispatch('setToken', res.data.authenticationToken);
            store.dispatch('setProfileLoggingInMicrosoft', false);

            const profileId = res.data.user.userId;
            const success = (state, profileId) => {
              // Create new profile if doesn't exist
              if (!state.profile.email) {
                profileService.createProfile({
                  id: profileId,
                  name: silentRes.account.name,
                  email: silentRes.account.username,
                  loginType: 'Microsoft',
                });
              }
            };

            profileService.getProfile(success, store.state, profileId);
          } else {
            store.dispatch('error', loginErrorMsg);
          }
        })
        .catch(() => {
          store.dispatch('error', loginErrorMsg);
        });
    });
}

export default {
  selectAccount,
  async login() {
    store.dispatch('setProfileLoggingInGoogle', true);
    await msalInstance
      .loginPopup(microsoftConfig.loginRequest)
      .then(selectAccount)
      .catch(() => store.dispatch('setProfileLoggingInGoogle', false));
  },
  async logout() {
    await msalInstance.logoutPopup();
  },
};
