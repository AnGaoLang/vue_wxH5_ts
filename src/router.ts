import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
  
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
      name: 'map',
      component: () => import(/* webpackChunkName: "map" */ './views/stageA/map.vue'),
    },
  ],
});

export default router;
