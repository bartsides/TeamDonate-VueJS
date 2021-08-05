import router from '@/router';
import store from '@/store';
import httpClient from './httpClient';

const isProfileComplete = function (profile) {
  const data = profile ?? store.state.profile;
  // TODO require complete profile to register org or team
  return (
    data &&
    data.name &&
    data.address1 &&
    data.city &&
    data.state &&
    data.zip &&
    data.phone &&
    data.email
  );
};

export default {
  isProfileComplete,
  getProfile(callback, state, profileId) {
    httpClient
      .get(`GetProfile/${profileId}`, {
        headers: { 'x-functions-key': process.env.VUE_APP_GET_PROFILE },
      })
      .then((res) => {
        if (res && res.status == '200') {
          // Don't overwrite if user already logged in with complete profile
          if (res.data && !isProfileComplete())
            store.dispatch('setProfile', res.data);

          if (!isProfileComplete(res.data)) {
            // ask user for profile information
            router.push({ name: 'Update Profile' });
          }
          if (callback) callback(state, profileId);
        }
      });
  },
  createProfile(data) {
    // save profile info into cosmosdb
    httpClient
      .post('CreateProfile', data, {
        headers: { 'x-functions-key': process.env.VUE_APP_CREATE_PROFILE },
      })
      .then((res) => {
        if (res && res.status == '200') {
          store.dispatch('setProfile', data);
          if (!isProfileComplete()) {
            // ask user for profile information
            router.push({ name: 'Update Profile' });
          }
        }
      });
  },
  updateProfile(data) {
    return httpClient.post(`UpdateProfile`, data, {
      headers: { 'x-functions-key': process.env.VUE_APP_UPDATE_PROFILE },
    });
  },
};
