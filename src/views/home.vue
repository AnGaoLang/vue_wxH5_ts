<template>
  <div class="home pt_adapt" ref="top">
    <div class="title_main">
      <img class="star" src="@/assets/img/main/star.png">
      <!-- <img class="title_top" src="@/assets/img/main/title.png"> -->
      <div class="title_top">
        <img class="title_l" src="@/assets/img/main/title_l.png">
        <img class="title_t" src="@/assets/img/main/title_t.png">
        <img class="title_r" src="@/assets/img/main/title_r.png">
      </div>
      <div class="title_mid">
        <img class="bt_bg" src="@/assets/img/main/bottom.png">
        <img class="bt_louA" src="@/assets/img/main/bottom_louA.png">
        <img class="bt_louB" src="@/assets/img/main/bottom_louB.png">
        <img class="bt_moon" src="@/assets/img/main/bottom_moon.png">
        <div class="btn" ref="bottom">
          <span v-for="item in btnList"
                :key="item.classs"
                :class="['btn_com', item.class, item.isClick ? 'zoom_in' : '']"
                @click="goToStage(item)">
            <img v-show="item.halfLock"  src="@/assets/img/main/halflock.png">
            <img v-show="item.fullLock" src="@/assets/img/main/fulllock.png">
          </span>
        </div>
        <page-bot class="home_bottom"/>
      </div>
    </div>

    <pop-up :show="showFol">
      <template>
        <div class="popup_main">
          <p>对不起！您还不是<span>【1916沙龙】</span>会员</p>
          <p>请识别二维码关注后参加活动</p>
          <img class="popup_qr" src="@/assets/img/main/qr.png">
          <div class="close" @click="showFol = false">关闭</div>
        </div>
      </template>
    </pop-up>

    <pop-up :show="showRule && !!isFirstIn">
      <template>
        <div class="popup_rule" :style="{'padding-top': stages.value == 1 ? '0.8rem' : '1.18rem'}">
          <img class="popup_title" :src="ruleTitle[stages.value]">
          <div class="popup_info" v-if="stages.value == 0">
            <p>1. <span>活动时间：9月12日-9月19日</span></p>
            <p>2. 活动每天进入【黄鹤送福】页面可随机拆开3张福签，福签隐藏着超多福利哦！大额楼币、楼楼周边还有祝福卡。</p>
            <p>3.每获得5张不同的祝福卡，即可获得一只金色黄鹤，移动黄鹤至地图上点亮，即可获得<span class="big_red">共享8888888</span>楼币的机会！</p>
            <p class="rule_tips">* 活动期间，用户在扫码验真获取诚信福利时，也有机会获得祝福卡哦！</p>
          </div>
          <div class="popup_info" v-if="stages.value == 1">
            <p>1. <span>活动时间：9月20日-9月26日</span></p>
            <p>2.点击地图任意位置即可获取“我和我的祖国”建国70周年限量版定制的海报模板，三种款式选择。</p>
            <p>3.上传照片，即可制作“我和我的祖国”建国70周年限量版定制海报，可多次生成，但可选择一张参与下一期【圆梦中国】投票活动。</p>
            <p>4.参赛作品将在24小时内返回审核结果，审核中的参赛作品可随时更换，一旦审核通过后将不能更换参赛作品。审核未通过的可以重新选择作品上传。</p>
            <p>5.请自觉遵守互联网相关的政策法规，严禁上传色情、暴力、敏感、反动图片。</p>
            <p class="rule_tips" style="margin-top:0;">* 制作海报的照片仅在本次活动中使用，不会另做他用</p>
          </div>
          <div class="popup_info" v-if="stages.value == 2">
            <p>1. <span>活动时间：9月27日-10月7日</span></p>
            <p>2. 每位用户每天可进入活动页投出3票，须投给三个不同作品；</p>
            <p>3. 票数达到100即可参与“圆梦礼包”抽奖活动，惊喜大礼送不停！</p>
            <p class="rule_tips">* 制作海报的照片仅在本次活动中使用，不会令做他用</p>
          </div>
          <div class="close" @click="goStage">关闭</div>
        </div>
      </template>
    </pop-up>

    <pop-up :show="resultShow">
      <template>
        <div class="popup_result">
          <div class="result_bg">
            <img src="@/assets/img/main/result.png">
            <p>恭喜你！获得<span>777楼币</span>！</p>
            <p>（于1~2个工作日内到账）</p>
          </div>
          <div class="close" @click="this.resultShow = false;">关闭</div>
        </div>
      </template>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { isSubscribe} from '@/utils/service';
import { getQueryString, adaptPt, isToday, getLocal, setLocal, clearLocal } from '@/utils/util';

interface StageBtn {
  class: string,
  fullLock: boolean,
  halfLock: boolean,
  link: string,
}

export default Vue.extend({
  name: 'home',
  data (): any {
    return {
      ruleTitle: [
        require('../assets/img/main/hhsf_title.png'),
        require('../assets/img/main/zmzg_title.png'),
        require('../assets/img/main/ymzg_title.png'),
      ],
      isFirstIn: 1,
      isFollow: true,
      showFol: false,
      showRule: false,
      resultShow: false,
      btnList: [
        {
          class: 'btn_hhsf',
          fullLock: false,
          halfLock: true,
          isClick: false,
          link: '/luckyDraw',
        },
        {
          class: 'btn_zmzg',
          fullLock: false,
          halfLock: true,
          isClick: false,
          link: '/map',
        },
        {
          class: 'btn_ymzg',
          fullLock: false,
          halfLock: true,
          isClick: false,
          link: '',
        }
      ],
      currentItem: {}
    }
  },
  inject: ['stages'],
  mounted () {
    this.getSubStatus();
    this.todayFirst();
    this.btnMask();
    this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom));
  },
  methods: {
    todayFirst () {
      const local = getLocal('today');
      const today = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;
      if (!local || !getLocal('isFirst') || (local && !isToday(local))) {
        setLocal('today', today);
        setLocal('isFirst', '1');
      }
    },
    async getSubStatus (): Promise<any> {
      const obj = await isSubscribe();
      this.isFollow = obj ? obj.isSubscribe : false;
      this.resultShow = obj ? obj.isLight : false;
      this.showFol = !this.isFollow;
    },
    btnMask () {
      this.btnList.forEach((item: StageBtn, index: number) => {
        switch (this.stages.value) {
          case 0:
            setTimeout(() => this.btnList[0].isClick = true, 2500);
            if (!index) {
              this.btnList[index].fullLock = false;
              this.btnList[index].halfLock = false;
            } else {
              this.btnList[index].fullLock = false;
              this.btnList[index].halfLock = true;
            }
            break;
          case 1:
            setTimeout(() => this.btnList[1].isClick = true, 2500);
            this.btnList[0].fullLock = true;
            this.btnList[0].halfLock = false;
            this.btnList[1].fullLock = false;
            this.btnList[1].halfLock = false;
            this.btnList[2].fullLock = false;
            this.btnList[2].halfLock = true;
            break;
          case 2:
            setTimeout(() => this.btnList[2].isClick = true, 2500);
            this.btnList[0].fullLock = true;
            this.btnList[0].halfLock = false;
            this.btnList[1].fullLock = true;
            this.btnList[1].halfLock = false;
            this.btnList[2].fullLock = false;
            this.btnList[2].halfLock = false;
            break;
          case 3:
            this.btnList[index].fullLock = true;
            this.btnList[index].halfLock = false;
            break;
        }
      });
      if (this.btnList.every((item: StageBtn) => item.fullLock)) {
        this.showRule = false;
      }
    },
    goStage () {
      this.showRule = false
      this.$router.replace(`${this.currentItem.link}`);
    },
    goToStage (item: StageBtn): void {
      if (item.fullLock || item.halfLock) return;
      if (!this.isFollow) {
        this.showFol = true;
        return;
      } else {
        this.currentItem = item
        this.isFirstIn = Number(getLocal('isFirst'));
        if (this.isFirstIn) {
          this.showRule = !this.showFol;
          setLocal('isFirst', '0');
        } else {
          this.goStage();
        }
      }
    }
  },
});
</script>

<style lang="scss" scoped>
  .home{
    margin-top: -0.2rem;
    @extend .h100;
  }

  .title_main {
    @extend .pr;
    & > img{
      @extend .pr;
      @extend .blo;
      @extend .w100;
    }
    & > .star {
      @extend .pa;
      top: -1.5rem;
      right: 0;
      width: 7rem;
    }
  }

  .title_top {
    @extend .pr;
    height: 5.28rem;
    z-index: 10;
    background: url('../assets/img/main/title.png') 0 0/100% 100% no-repeat;
    animation: fadeIn 0.5s 1 linear normal forwards;
    & > img {
      @extend .pa;
    }
  }

  .title_l {
    top: 2.4rem;
    left: 0;
    width: 1.15rem;
    height: auto;
    transform: scale(0.1);
    animation: bloom 0.3s 1s 1 linear normal forwards;
  }

  .title_t {
    top: 0;
    left: 3rem;
    width: 1.15rem;
    height: auto;
    transform: scale(0.1);
    animation: bloom 0.3s 1s 1 linear normal forwards;
  }

  .title_r {
    right: 0.1rem;
    bottom: 0;
    width: 0.9rem;
    height: auto;
    transform: scale(0.1);
    animation: bloom 0.3s 1s 1 linear normal forwards;
  }

  .title_mid {
    @extend .pr;
    margin-top: -0.82rem;
    z-index: 9;
  }

  .bt_bg {
    @extend .pr;
    @extend .w100;
    z-index: 9;
  }

  .bt_louA {
    @extend .pa;
    top: 0.5rem;
    left: 0.65rem;
    width: 3.2rem;
    z-index: 8;
    transform: translateY(100%);
    animation: riseUp 0.5s 1 linear normal forwards;
  }

  .bt_louB {
    @extend .pa;
    @extend .w100;
    top: 2.08rem;
    left: 0;
    z-index: 7;
    transform: translateY(100%);
    animation: riseUp 0.5s 0.2s 1 linear normal forwards;
  }

  .bt_moon {
    @extend .pa;
    top: 0;
    left: 52%;
    margin-left: -2.65rem;
    width: 5.3rem;
    z-index: 6;
    transform: translateY(100%);
    animation: riseUp 0.5s 0.4s 1 linear normal forwards;
  }

  .btn {
    padding: 0 0.9rem;
    @extend .pa;
    z-index: 15;
    top: 5.35rem;
    & > .btn_com:last-child {
      margin-right: 0;
    } 
  }

  .btn_com {
    @extend .iblo;
    @extend .pr;
    margin-right: .5rem;
    width: 1.5rem;
    height: 2.1rem;
    & > img {
      @extend .pa;
      @extend .w100;
      top: 0;
      left: 0;
    }
  }

  .btn_hhsf {
    background: url('../assets/img/main/hhsf.png') 0 0/100% 100% no-repeat;
    opacity: 0;
    animation: rollOver 0.3s 0.6s 1 linear normal forwards;
  }

  .btn_zmzg {
    background: url('../assets/img/main/zmzg.png') 0 0/100% 100% no-repeat;
    opacity: 0;
    animation: rollOver 0.3s 1.2s 1 linear normal forwards;
  }

  .btn_ymzg {
    background: url('../assets/img/main/ymzg.png') 0 0/100% 100% no-repeat;
    opacity: 0;
    animation: rollOver 0.3s 1.8s 1 linear normal forwards;
  }

  .zoom_in {
    opacity: 1;
    animation: zoom 0.8s linear infinite alternate;
  }

  .popup_main {
    @extend .pa_mid;
    @extend .br5;
    padding: 0.8rem 0.5rem 0.6rem;
    width: 85%;
    background: $followBg;
    text-align: center;
    & > p {
      @extend .fm_hy;
      line-height: 0.48rem;
      font-size: 0.32rem;
      span {
        color: $bigRed;
      }
    }
  }

  .popup_qr {
    @extend .iblo;
    margin: 0.75rem auto;
    width: 4.05rem;
    height: 4.05rem;
  }

  .popup_rule {
    @extend .pa_mid;
    padding: 1.18rem 0.5rem 0;
    width: 6.4rem;
    height: 8.8rem;
    background: url('../assets/img/main/rule_bg.png') 0 0/100% 100% no-repeat;
    .close {
      @extend .pa;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.7rem;
    }
  }

  .popup_title {
    @extend .pa;
    width: 4.5rem;
    top: 0;
    left: 50%;
    transform: translate(-50%, -120%);
  }

  .popup_info {
    @extend .fm_hy;
    font-size: 0.3rem;
    color: $black;
    line-height: 0.48rem;
    text-align: justify;
    height: 6rem;
    overflow: auto;
    & > p:first-child > span {
      font-size: 0.34rem;
      color: $ruleTitleRed;
    }
    & > .rule_tips {
      margin-top: 0.6rem;
      color: $orangeTips;
    }
    .big_red{
      color: $bigRed;
    }
  }
  
  .close {
    @extend .mAu;
    @extend .fm_pf;
    width: 3.6rem;
    @extend .closeWH;
    background: url('../assets/img/main/close.png') 0 0/100% 100% no-repeat;
    color: $close;
  }

  .popup_result {
    @extend .pa_mid;
    width: 6.05rem;
    height: 7.8rem;
    .close {
      @extend .pa;
      left: 50%;
      transform: translate(-50%, 100%);
      bottom: 1rem;
      color: $resultClose;
      background: url('../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
    }
  }

  .result_bg {
    padding: 0.55rem 0.38rem 0.38rem;
    width: 6.05rem;
    height: 6.05rem;
    background: url('../assets/img/main/result_bg.png') 0 0/100% 100% no-repeat;
    & > img {
      @extend .blo;
      @extend .w100;
      height: auto;
    }
    & > p{
      font-size: 0.4rem;
      color: $black;
      line-height: 0.7rem;
      text-align: center;
      & > span {
        color: $ruleTitleRed;
      }
    }
  }
  .home_bottom {
    @extend .pa;
    top: 7.7rem;
    left: 50%;
    z-index: 30;
    transform: translateX(-50%);
    white-space: nowrap;
  }
</style>
