export default {
  profile(state) {
    return state.profile;
  },
  profileDoneLoggingIn(state) {
    return state.profileLoggingIn.complete;
  },
  isAdmin(state) {
    return state.profile && state.profile.admin;
  },
  events(state) {
    return state.events;
  },
  organizations(state) {
    return state.organizations;
  },
};
