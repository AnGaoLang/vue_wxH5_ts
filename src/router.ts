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
      path: '/myWorks',
      name: 'myWorks',
      component: () => import(/* webpackChunkName: "myWorks" */ './views/stageB/myWorks.vue'),
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
    ]
  });

  // wx.ready(() => {
  //   wx.hideMenuItems({
  //     menuList: [ 'menuItem:copyUrl' ]
  //   });
  //   const toFriend = {
  //     title: '我和我的祖国', // 分享标题
  //     desc: '团聚你我，圆梦中国。参与活动，赢惊喜大奖!', // 分享描述
  //     link: 'http://hhlqr.whcewei.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 分享链接
  //     imgUrl: 'https://hhlqr.whcewei.com/nd/static/share.jpg', // 分享图标
  //     success: () => {}
  //   };
  //   const toCircle = {
  //     title: '我和我的祖国', // 分享标题
  //     link: 'http://hhlqr.whcewei.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 分享链接
  //     imgUrl: 'https://hhlqr.whcewei.com/nd/static/share.jpg', // 分享图标
  //     success: () => {}
  //   };
  //   // wx.onMenuShareAppMessage(toFriend);
  //   // wx.onMenuShareTimeline(toCircle);
  //   wx.updateAppMessageShareData(toFriend);
  //   wx.updateTimelineShareData(toCircle);
  // });

  wx.ready(() => {
    wx.hideMenuItems({
      menuList: [ 'menuItem:copyUrl' ]
    });

    const toFriend = {
      title: '黄鹤送福，抢8百万楼币', // 分享标题
      desc: '《我和我的祖国》系列活动第一期，团聚你我，圆梦中国！', // 分享描述
      link: 'https://wx.hhl1916.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 分享链接
      imgUrl: 'https://qr.hhl1916.com/nd/static/share.jpg', // 分享图标
      success: () => {}
    };
    const toCircle = {
      title: '黄鹤送福，抢8百万楼币', // 分享标题
      link: 'https://wx.hhl1916.com/opc/ms/wxForeign/r?fsr=toZhongqiu', // 分享链接
      imgUrl: 'https://qr.hhl1916.com/nd/static/share.jpg', // 分享图标
      success: () => {}
    };

    wx.onMenuShareAppMessage(toFriend);
    wx.onMenuShareTimeline(toCircle);
    wx.updateAppMessageShareData(toFriend);
    wx.updateTimelineShareData(toCircle);
  });
})

export default router;
