import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import money from 'v-money';
import Maska from 'maska';
import vSelect from 'vue-select';
import Toast, { POSITION } from 'vue-toastification';
import '@/plugins/vee-validate.js';
import idService from '@/services/idService.js';

// Auth
import facebookService from '@/services/facebookService.js';
import GAuth from 'vue-google-oauth2';
import googleConfig from '@/config/googleConfig.js';
Vue.use(GAuth, googleConfig);

// Styles
import '@/assets/styles/main.sass';
import 'vue-toastification/dist/index.css';
import 'vue-select/dist/vue-select.css';

// Font Awesome setup
import '@/config/fontawesomeConfig.js';

// Set dayjs timezone
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

// Create global methods
Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs;
    },
  },
  $newid: {
    get() {
      return idService.newid;
    },
  },
});

Vue.config.productionTip = false;
Vue.use(store);
Vue.use(router);
Vue.use(money, {
  decimal: '.',
  thousands: ',',
  prefix: '$',
  precision: 2,
  masked: false,
});
Vue.use(Maska);
Vue.use(Toast, { position: POSITION.BOTTOM_RIGHT });
Vue.component('v-select', vSelect);

// Setup and wait for facebook authentication
facebookService.initSdk().then(startApp);

function startApp() {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}
