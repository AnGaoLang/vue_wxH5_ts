import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
  
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
    },
    {
      path: '/luckyDraw',
      name: 'luckyDraw',
      component: () => import(/* webpackChunkName: "luckyDraw" */ './views/stageA/luckyDraw.vue'),
    },
    {
      path: '/map',
      name: 'stageAmap',
      component: () => import(/* webpackChunkName: "staeAmap" */ './views/stageA/map.vue'),
    },
  ],
});

export default router;
