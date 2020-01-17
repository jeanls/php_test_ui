import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$url = "http://127.0.0.1:8000/api";

axios.interceptors.request.use(
    config => {
      store.commit('setRequest', true);
      return config;
    },
    error => {
      store.commit('setRequest', false);
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    config => {
      store.commit('setRequest', false);
      return config;
    },
    function(error) {
      store.commit('setRequest', false);
      return Promise.reject(error);
    }
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
