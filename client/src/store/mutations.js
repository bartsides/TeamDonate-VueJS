function storeDoneLoggingIn(state) {
  state.profileLoggingIn.complete =
    !state.profileLoggingIn.google &&
    !state.profileLoggingIn.facebook &&
    !state.profileLoggingIn.microsoft;
}

export default {
  storeToken(state, token) {
    state.token = token;
  },
  storeLoginType(state, loginType) {
    state.loginType = loginType;
  },
  storeProfile(state, profile) {
    state.profile = profile ? profile : {};
  },
  resetProfile(state) {
    state.profile = {};
  },
  storeProfileLoggingInGoogle(state, loggingIn) {
    state.profileLoggingIn.google = loggingIn;
    storeDoneLoggingIn(state);
  },
  storeProfileLoggingInFacebook(state, loggingIn) {
    state.profileLoggingIn.facebook = loggingIn;
    storeDoneLoggingIn(state);
  },
  storeProfileLoggingInMicrosoft(state, loggingIn) {
    state.profileLoggingIn.microsoft = loggingIn;
    storeDoneLoggingIn(state);
  },
  storeResetProfileLoggingIn(state) {
    state.profileLoggingIn.complete = true;
    state.profileLoggingIn.google = false;
    state.profileLoggingIn.facebook = false;
    state.profileLoggingIn.microsoft = false;
  },
  storeFbId(state, fbId) {
    state.profile.fbId = fbId;
  },
  storeEvents(state, events) {
    state.events = events;
  },
  storeOrganizations(state, organizations) {
    state.organizations = organizations;
  },
};
