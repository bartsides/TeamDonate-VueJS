export default {
  token: '',
  loginType: '',
  profile: {
    id: '',
    name: '',
    email: '',
  },
  // Default to true as services automatically try to authenticate
  profileLoggingIn: {
    complete: false,
    google: true,
    facebook: true,
    microsoft: true,
  },
  events: [],
  organizations: [],
  teams: [],
};
