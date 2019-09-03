<template>
  <div class="stageA_container">
    <div class="top_a">
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
          <img v-if="isGoMap" :class="[isFly ? 'fly' : '']" src="@/assets/img/stageA/he.gif">
          <img v-else src="@/assets/img/stageA/he.png">
          放飞祝福
        </div>
      </div>
    </div>

    <pop-up :show="wining.bool">
      <template v-slot:main>
        <div class="win">
          <div class="win_title">
            <span>
              <p>恭喜你！获得辉煌祝福</p>
              <p>集齐5种祝福语即可放飞祝福</p>
            </span>
          </div>
          <div class="win_mid">
            <img src="@/assets/img/stageA/win_lb.png">
            <!-- <img class="win_board" src="@/assets/img/stageA/win_lb.png"> -->
          </div>
          <div class="close" @click="wining.bool = false">关闭</div>
        </div>
      </template>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'luckyDraw',
  data () {
    return {
      treeBoard: [1, 1, 1, 1, 1],
      isFly: false,
      wining: {
        bool: false
      },
    }
  },
  computed: {
    isGoMap (): boolean {
      return this.treeBoard.every((item: number) => item > 0);
    }
  },
  methods:{
    luckyDraw () {
      console.log(1);
    },
    goMap () {
      if (!this.isGoMap) return;
      this.isFly = true;
      setTimeout(() => {
        this.$router.push('/map');
      },2000)
    }
  }
})
</script>

<style lang="scss" scoped>

.stageA_container {
  @extend .h100;
  padding-top: 0.85rem;
  background: url('../../assets/img/stageA/bg.png') 0 0/100% auto no-repeat;
}

.top_a {
  @extend .w100;
  height: 10.5rem;
  padding-top: 1rem;
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
  & > img{
    @extend .pa;
    top: -0.25rem;
    left: -0.2rem;
    width: 1.75rem;
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
  display: table;
  height: 1.6rem;
  line-height: 0.6rem;
  font-size: 0.38rem;
  color: $winTop;
  & > span {
    display: table-cell;
    vertical-align: middle;
  }
  & p:last-child {
    font-size: 0.28rem;
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
</style>