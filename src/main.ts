import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import popUp from './components/popup.vue';
import '@/utils/rem.js';
import '@/assets/css/basic.scss';

Vue.config.productionTip = false;

Vue.component('pop-up', popUp);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
