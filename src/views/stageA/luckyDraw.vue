<template>
  <div class="stageA_container pt_adapt" ref="top">
    <div class="top_a" ref="moveTop">
      <div class="tree" @click="luckyDraw">
        <img class="tree_main" src="@/assets/img/stageA/tree.png">
        <img class="tree_board_com tree_boardA" src="@/assets/img/stageA/tree_boardA.png">
        <img class="tree_board_com tree_boardB" src="@/assets/img/stageA/tree_boardB.png">
        <img class="tree_board_com tree_boardC" src="@/assets/img/stageA/tree_boardC.png">
        <img class="tree_board_com tree_boardD" src="@/assets/img/stageA/tree_boardA.png">
        <img class="tree_board_com tree_boardE" src="@/assets/img/stageA/tree_boardA.png">
        <img class="tree_board_com tree_boardF" src="@/assets/img/stageA/tree_boardA.png">
        <div class="tree_click clearFix">
          <img class="fl hand" src="@/assets/img/stageA/click.png">
          <div class="fl">
            <p>点击心愿树</p>
            <p>收集祝福卡</p>
            <p>(限每日3次)</p>
          </div>
        </div>
      </div>
      <div class="tree_board_container">
        <img src="@/assets/img/stageA/hhsf.png">
        <div class="tree_board_box">
          <span v-for="(item, index) in treeBoard"
                :key="index">
            <span :class="['tree_board', 'tree_board' + index]" :style="{'opacity': (item == 0) ? '0.6' : '1'}"></span>
            <span class="num">{{item}}</span>
          </span>
        </div>
        <div class="go_map" @click="goMap">
          <div ref="bottom">
            <img v-if="isGoMap" :class="[isFly ? 'fly' : '']" src="@/assets/img/stageA/he.gif"  >
            <img v-else src="@/assets/img/stageA/he.png">
          </div>
          放飞祝福
        </div>
      </div>
    </div>

    <pop-up :show="wining.bool">
      <template v-slot:main>
        <div class="win">
          <div class="win_title">
            <span v-show="wining.type == 1">
              <p>恭喜你！获得{{wining.prizeName}}祝福</p>
              <p class="wining_board">集齐5种祝福语即可放飞祝福</p>
            </span>
            <span v-show="wining.type == 2">
              <p class="wining_coin">恭喜你！获得{{wining.prizeName}}</p>
            </span>
            <span v-show="wining.type == 3">
              <p>恭喜你！成功获得</p>
              <p class="wining_coin">楼楼家的福袋奖励!</p>
            </span>
          </div>
          <div class="win_mid">
            <img v-if="wining.type == 1" class="win_board" :src="wining.imgUrl">
            <img v-else :src="wining.imgUrl">
          </div>
          <div class="close" @click="clickFD">{{wining.closeText}}</div>
        </div>
      </template>
    </pop-up>

    <pop-up :show="exhaust">
      <template v-slot:main>
        <div class="popup_result">
          <div class="result_bg">
            <img src="@/assets/img/stageA/exhaust.png">
            <p>亲，今天的抽奖机会已用完，</p>
            <p>请明天再来~</p>
          </div>
          <div class="close" @click="exhaust = false;">确定</div>
        </div>
      </template>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getQueryString, adaptPt } from '@/utils/util';
import { luckyDrawInfo, luckyDraw } from '@/utils/service';

interface IsSubscribe {
  isSubscribe: boolean
}

export default Vue.extend({
  name: 'luckyDraw',
  data (): any {
    return {
      openid: '',
      treeBoard: [0, 0, 0, 0, 0],
      isFly: false,
      wining: {
        bool: false,
        type: 1,
        imgUrl: '',
        prizeName: '',
        closeText: ''
      },
      exhaust: false,
    }
  },
  inject: ['stages'],
  mounted () {
    this.getPageInfo();
    this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom, this.$refs.moveTop))
  },
  computed: {
    isGoMap (): boolean {
      return this.treeBoard.every((item: number) => item > 0);
    }
  },
  methods: {
    async getPageInfo (isloading: boolean = true) {
      const obj = await luckyDrawInfo('', isloading); // {'focaA': 0, 'focaB': 0, 'focaC': 0, 'focaD': 0, 'focaE': 0}
      if (obj) {
        this.goIndex(obj);
        const keys = ['focaA', 'focaB', 'focaC', 'focaD', 'focaE'];
        const array = [] as number[];
        keys.forEach((item: string, index: number) => {
          array[index] = obj[item];
        });
        this.treeBoard = array;
      }
    },
    async luckyDraw () {
      const obj = await luckyDraw(); // {"imgUrl": "", "isSubscribe": true, "prizeName": "和谐福签"， prizeType: 1}
      if (obj) {
        if (obj.code == 501) { // code为501时，代表当日抽奖次数已耗尽
          this.exhaust = true;
        } else {
          this.goIndex(obj);
          this.wining.bool = true;
          this.wining.type = obj.prizeType;
          this.wining.imgUrl = obj.imgUrl;
          switch (obj.prizeType) {
            case 1:
              this.wining.prizeName = obj.prizeName;
              this.wining.closeText = '收下祝福';
              break;
            case 2:
              this.wining.prizeName = obj.prizeName;
              this.wining.closeText = '收下奖励';
              break;
            case 3:
              this.wining.prizeName = obj.prizeName;
              this.wining.closeText = '收下奖励';
              break;
          }
          this.getPageInfo(false);
        }
      };
    },
    goMap () {
      if (!this.isGoMap) return;
      this.isFly = true;
      setTimeout(() => {
        this.$router.replace(`/map`);
      }, 2000)
    },
    clickFD () {
      this.wining.bool = false;
      if (this.wining.type == 3) {
        window.location.replace('http://hhlqr.whcewei.com/opc/ms/wxForeign/r?fsr=toOrderList');
      }
    },
    goIndex (obj: IsSubscribe) {
      if (!obj.isSubscribe) this.$router.replace(`/home`);
    }
  }
})
</script>

<style lang="scss" scoped>
.stageA_container {
  @extend .h100;
  background: url('../../assets/img/stageA/bg.png') 0 0/100% auto no-repeat;
}

.top_a {
  @extend .w100;
  padding-top: 1rem;
  height: 10.5rem;
  background: url('../../assets/img/stageA/moon.png') 0 0/100% 100% no-repeat;
}

.tree {
  @extend .pr;
  z-index: 9;
  margin-left: 0.88rem;
  width: 6.1rem;
  height: 7.15rem;
}

.tree_main {
  @extend .pr;
  @extend .wh100;
  z-index: 9;
}

.tree_board_container {
  @extend .pr;
  z-index: 10;
  margin-top: -0.9rem;
  & > img {
    @extend .blo;
    @extend .mAu;
    width: 5.65rem;
    height: auto;
  }
}

.tree_board_box {
  margin-top: 0.35rem;
  text-align: center;
  & > span {
    @extend .pr;
    @extend .iblo;
    margin-right: 0.2rem;
    width: 1.14rem;
    height: 2.34rem;
  }
}

.tree_board {
    @extend .iblo;
    @extend .wh100;
}
.tree_board0 {
  background: url('../../assets/img/stageA/ty.png') 0 0/100% 100% no-repeat;
}
.tree_board1 {
  background: url('../../assets/img/stageA/lz.png') 0 0/100% 100% no-repeat;
}
.tree_board2 {
  background: url('../../assets/img/stageA/ya.png') 0 0/100% 100% no-repeat;
}
.tree_board3 {
  background: url('../../assets/img/stageA/hx.png') 0 0/100% 100% no-repeat;
}
.tree_board4 {
  background: url('../../assets/img/stageA/hh.png') 0 0/100% 100% no-repeat;
}

.num {
  @extend .pa;
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
  width: 0.3rem;
  height: 0.3rem;
  border: 1px solid $bigRed;
  border-radius: 100%;
  background: $LDDot;
  font-size: 0.22rem;
  color: $bigRed;
}

.go_map {
  @extend .pr;
  @extend .mAu;
  @extend .fm_pf;
  margin-top: 0.15rem;
  padding-left: 1.65rem;
  width: 3.8rem;
  height: 0.95rem;
  line-height: 1.05rem;
  font-size: 0.32rem;
  color: $resultClose;
  background: url('../../assets/img/stageA/btn.png') 0 0/100% 100% no-repeat;
  & > div {
    @extend .pa;
    // top: -0.25rem;
    margin-top: -0.25rem;
    left: -0.2rem;
    width: 1.75rem;
    height: 1.85rem;
  }
  & img{
    @extend .blo;
    @extend .w100;
    height: auto;
  }
}

.win {
  @extend .pa_mid;
  padding-top: 1.05rem;
  width: 5.95rem;
  height: 9.68rem;
  background: url('../../assets/img/stageA/win_bg.png') 0 0/100% 100% no-repeat;
  text-align: center;
}

.close {
  @extend .pa;
  @extend .closeWH;
  left: 50%;
  transform: translate(-50%, 100%);
  bottom: 1.1rem;
  color: $resultClose;
  background: url('../../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
}

.win_title {
  @extend .fm_ss;
  @extend .w100;
  margin-top: 0.1rem;
  display: table;
  height: 1.6rem;
  line-height: 0.6rem;
  font-size: 0.38rem;
  color: $winTop;
  & > span {
    display: table-cell;
    vertical-align: middle;
  }
  .wining_board {
    font-size: 0.28rem;
  }
  .wining_coin {
    font-size: 0.38rem;
  }
}

.win_mid {
  padding-top: 0.75rem;
  height: 5.5rem;
  & > img {
    max-height: 4.05rem;
  }
  & > .win_board {
    margin-left: -0.7rem;
  }
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
    background: url('../../assets/img/stageA/map_btn.png') 0 0/100% 100% no-repeat;
  }
}

.result_bg {
  padding: 0.65rem 0.38rem 0.38rem;
  width: 6.05rem;
  height: 6.05rem;
  background: url('../../assets/img/stageA/map_inner.png') 0 0/100% 100% no-repeat;
  & > img {
    @extend .blo;
    @extend .mAu;
    margin-bottom: 0.2rem;
    width: 2.28rem;
    height: auto;
  }
  & > p{
    @extend .fm_ss;
    font-size: 0.38rem;
    color: $exhaust;
    line-height: 0.8rem;
    text-align: center;
    & > span {
      color: $ruleTitleRed;
    }
  }
}
</style>