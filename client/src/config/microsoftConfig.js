import * as msal from '@azure/msal-browser';

export default {
  auth: {
    clientId: process.env.VUE_APP_MICROSOFT_CLIENT_ID,
    authority: process.env.VUE_APP_MICROSOFT_AUTHORITY,
    redirectUri: process.env.VUE_APP_MICROSOFT_REDIRECT,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
  loginRequest: {
    scopes: ['User.Read'],
    prompt: 'login',
  },
};
