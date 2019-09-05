import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/home',
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
    {
      path: '/myWorks',
      name: 'myWorks',
      component: () => import(/* webpackChunkName: "myWorks" */ './views/stageB/myWorks.vue'),
    }
  ],
});

export default router;
