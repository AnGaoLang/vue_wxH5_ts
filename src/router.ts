/// <reference path="./wx-js-sdk.d.ts">
import Vue from 'vue';
import Router from 'vue-router';
import { checkWX } from '@/utils/service';
import wx from 'weixin-js-sdk';

Vue.use(Router);

let router = new Router({
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
      path: '/uploadPic',
      name: 'uploadPic',
      component: () => import(/* webpackChunkName: "uploadPic" */ './views/stageB/uploadPic.vue'),
    },
    {
      path: '/myWorks',
      name: 'myWorks',
      component: () => import(/* webpackChunkName: "myWorks" */ './views/stageB/myWorks.vue'),
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import(/* webpackChunkName: "preview" */ './views/stageB/preview.vue'),
    },
    {
      path: '/thumbsUp',
      name: 'thumbsUp',
      component: () => import(/* webpackChunkName: "thumbsUp" */ './views/stageC/thumbsUp.vue'),
    }
  ],
});

router.afterEach(async (to) => {
  const baseUrl = window.location.href.split('#')[0];
  const curUrl = `${baseUrl}#${to.fullPath}`;
  const res = await checkWX(encodeURIComponent(window.location.href));
  wx.config({
    debug: false,
    appId: res.appid,
    timestamp: res.timestamp,
    nonceStr:  res.nonceStr,
    signature: res.signature,
    jsApiList: [
      'hideMenuItems',
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareQZone',
      'chooseImage'
    ]
  });

  wx.ready(() => {
    wx.hideMenuItems({
      menuList: [ 'menuItem:copyUrl' ]
    });

    const toFriend = {
      title: '聚人气拼实力，黄鹤宝盒国庆开启！', // 分享标题
      desc: '《我和我的祖国》系列活动第三期，大奖在即，圆梦中国！', // 分享描述
      link: 'https://wx.hhl1916.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 正式分享链接
      // link: 'http://hhlqr.whcewei.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 测试分享链接
      imgUrl: 'https://qr.hhl1916.com/nd/static/share.jpg', // 分享图标
      // success: () => {}
    };
    const toCircle = {
      title: '聚人气拼实力，黄鹤宝盒国庆开启！', // 分享标题
      link: 'https://wx.hhl1916.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 正式分享链接
      // link: 'http://hhlqr.whcewei.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 测试分享链接
      imgUrl: 'https://qr.hhl1916.com/nd/static/share.jpg', // 分享图标
      // success: () => {}
    };

    wx.onMenuShareAppMessage(toFriend);
    wx.onMenuShareTimeline(toCircle);
    wx.updateAppMessageShareData(toFriend);
    wx.updateTimelineShareData(toCircle);
  });
})

export default router;
