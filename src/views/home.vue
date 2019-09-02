<template>
  <div class="home">
    <div class="title_main">
      <img class="star" src="@/assets/img/main/star.png">
      <img class="title_top" src="@/assets/img/main/title.png">
      <div class="title_mid">
        <img src="@/assets/img/main/bottom.png">
        <div class="btn">
          <span v-for="item in btnList"
                :key="item.classs"
                :class="['btn_com', item.class]"
                @click="goToStage(item)">
            <img v-show="item.halfLock"  src="@/assets/img/main/halflock.png">
            <img v-show="item.fullLock" src="@/assets/img/main/fulllock.png">
          </span>
        </div>
      </div>
    </div>

    <pop-up :show="showFol">
      <template v-slot:main>
        <div class="popup_main">
          <p>对不起！您还不是<span>【1916沙龙】</span>会员</p>
          <p>请识别二维码关注后参加活动</p>
          <img class="popup_qr" src="@/assets/img/main/qr.png">
          <div class="close" @click="showFol = false">关闭</div>
        </div>
      </template>
    </pop-up>

    <pop-up :show="showRule">
      <template v-slot:main>
        <div class="popup_rule">
          <img class="popup_title" :src="ruleTitle[stage]">
          <div class="popup_info" v-if="stage == 0">
            <p>1. <span>活动时间：9月13日-9月19日</span></p>
            <p>2. 活动每天进入【黄鹤送福】页面可随机拆开3张福签，福签隐藏着超多福利哦！大额楼币、楼楼周边还有祝福卡。</p>
            <p>3.每获得5张不同的祝福卡，即可获得一只金色黄鹤，移动黄鹤至地图上点亮，即可获得瓜分百万楼币的机会！</p>
            <p class="rule_tips">* 活动期间，用户在扫码验真获取诚信福利时，也有机会获得祝福卡哦！</p>
          </div>
          <div class="popup_info" v-if="stage == 1">
            <p>1. <span>活动时间：9月20日-9月26日</span></p>
            <p>2.点击地图任意位置即可获取“我和我的祖国”建国70周年限量版定制的海报模板，三种款式选择。</p>
            <p>3.上传照片，即可制作“我和我的祖国”建国70周年限量版定制海报，活动结束后，通过审核的照片可以参与下一期【圆梦中国】投票活动。</p>
            <p>4.可随时删除或重新上传照片，可多次生成海报但仅有一张可以参与【圆梦中国】活动哦！</p>
          </div>
          <div class="popup_info" v-if="stage == 2">
            <p>1. <span>活动时间：9月27日-10月7日</span></p>
            <p>2. 每位用户每天可进入活动页投出3票，须投给三个不同作品；</p>
            <p>3. 票数达到100即可参与“圆梦礼包”抽奖活动，惊喜大礼送不停！</p>
          </div>
          <div class="close" @click="showRule = false">关闭</div>
        </div>
      </template>
    </pop-up>

    <pop-up :show="resultShow">
      <template v-slot:main>
        <div class="popup_result">
          <div class="result_bg">
            <img src="@/assets/img/main/result.png">
            <p>恭喜你！获得<span>777楼币</span>！</p>
            <p>（于1~2个工作日内到账）</p>
          </div>
          <div class="close" @click="resultShow = false">关闭</div>
        </div>
      </template>
    </pop-up>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface stageBtn {
  class: string,
  fullLock: boolean,
  halfLock: boolean,
  link: string,
}

export default Vue.extend({
  name: 'home',
  data () {
    return {
      stage: 0,
      ruleTitle: [
        require("../assets/img/main/hhsf_title.png"),
        require("../assets/img/main/zmzg_title.png"),
        require("../assets/img/main/ymzg_title.png"),
      ],
      isFollow: true,
      showFol: false,
      showRule: false,
      resultShow: false,
      btnList: [
        {
          class: 'btn_hhsf',
          fullLock: false,
          halfLock: false,
          link: '/luckyDraw',
        },
        {
          class: 'btn_zmzg',
          fullLock: true,
          halfLock: false,
          link: '',
        },
        {
          class: 'btn_ymzg',
          fullLock: true,
          halfLock: false,
          link: '',
        }
      ],
    }
  },
  mounted () {
    this.showFol = !this.isFollow;
    this.showRule = !this.showFol;
  },
  methods: {
    goToStage (item:stageBtn): void {
      if (item.fullLock || item.halfLock) return;
      if (!this.isFollow) {
        this.showFol = true;
        return;
      };
      this.$router.push(item.link);
    }
  }
});
</script>

<style lang="scss" scoped>
  .home{
    padding-top: 1.2rem;
    @extend .h100;
  }

  .title_main {
    @extend .pr;
    img{
      @extend .pr;
      @extend .blo;
      @extend .w100;
    }
    .star {
      @extend .pa;
      top: -1.5rem;
      right: 0;
      width: 7rem;
    }
  }

  .title_top {
    height: 5.28rem;
    z-index: 10,
  }

  .title_mid {
    @extend .pr;
    margin-top: -0.82rem;
    z-index: 9;
  }

  .btn {
    padding: 0 0.9rem;
    @extend .pa;
    top: 5.35rem;
    & > .btn_com:last-child {
      margin-right: 0;
    } 
  }

  .btn_com {
    @extend .iblo;
    margin-right: .5rem;
    width: 1.5rem;
    height: 2.1rem;
    & > img {
      @extend .iblo;
      @extend .w100;
    }
  }

  .btn_hhsf {
    background: url('../assets/img/main/hhsf.png') 0 0/100% 100% no-repeat;
  }

  .btn_zmzg {
    background: url('../assets/img/main/zmzg.png') 0 0/100% 100% no-repeat;
  }

  .btn_ymzg {
    background: url('../assets/img/main/ymzg.png') 0 0/100% 100% no-repeat;
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
    & > p:first-child > span {
      font-size: 0.34rem;
      color: $ruleTitleRed;
    }
    & > .rule_tips {
      margin-top: 0.6rem;
      color: $orangeTips;
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
</style>
