
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import popUp from './components/popup.vue';
import pageBottom from './components/pageBottom.vue';
import loading from './components/loading/index';
import '@/utils/rem.js'
import '@/assets/css/basic.scss';
import '@/assets/css/animate.scss';

Vue.config.productionTip = false;
Vue.use(loading);

Vue.component('pop-up', popUp);
Vue.component('page-bot', pageBottom);

export const VM = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app') as any;
