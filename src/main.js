import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios'; // Import the centralized axios configuration

// Attach Axios to Vue instance
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
