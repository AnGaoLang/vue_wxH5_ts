<template>
  <div class="map_wrap" ref="top">
     <div class="map_container" @click="goStageB" ref="moveTop">
      <div :class="['map', mapLight ? 'map_none' : '']">
        <img v-show="!mapLight && mapGif" class="map_light" src="@/assets/img/stageA/map.gif">
        <img v-show="mapLight" class="map_light" src="@/assets/img/stageA/map_light.png">
        <img v-show="!mapLight" class="map_he" src="@/assets/img/stageA/he.gif">
      </div>
      <p class="map_bottom" ref="bottom">{{mapLight ? '[点击地图，筑梦中国]' : ''}}</p>
    </div>

    <pop-up :show="showResult">
      <template v-slot:main>
        <div class="map_pop">
          <div class="map_popt">
            <span>
              <p>恭喜你！成功放飞黄鹤</p>
            </span>
          </div>
          <div class="map_popm">
            <p>成功放飞黄鹤的楼主们将一起分享<span>8888888楼币!</span>最终获奖结果将在9月27日1916沙龙推文中公布，敬请持续关注活动进程。我和我的祖国第二期【筑梦中国】即将开启，上传照片生成你的专属海报吧，还有机会收获惊喜好礼哦！</p>
          </div>
          <div class="close" @click="goBacHome">返回主页</div>
        </div>
      </template>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { adaptPt } from '@/utils/util';

export default Vue.extend({
  name: 'stageAmap',
  data (): any {
    return {
      stageIndex: 0,
      show: false,
      mapGif: false,
      mapLight: false,
      showResult: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.mapGif = true;
      setTimeout(() => {
        !this.stageIndex && (this.showResult = true);
      }, 2500)
    }, 2000)
    this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom, this.$refs.moveTop));
  },
  methods: {
    goStageB () {
      if (!this.mapLight) return;
      this.$router.replace('/myWorks')
    },
    goBacHome () {
      this.$router.replace('/home');
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      if (from.path === '/home' && to.path === '/map') {
        vm.$data.mapLight = true;
        vm.$data.stageIndex = 1;
      };
    });
  }
})
</script>

<style lang="scss" scoped>
.map_wrap {
  @extend .wh100;
  background: url('../../assets/img/stageA/map_bg.png') 0 -1.2rem/100% auto no-repeat;
}

.map_container{
  padding-top: 2.6rem;
}

.map {
  @extend .pr;
  width: 100%;
  height: 7.5rem;
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/img/stageA/map.png');
  &.map_none {
    background-image: none;
  }
}
.map_light { 
  @extend .blo;
  @extend .wh100;
}

.map_he {
  @extend .pa;
  bottom: 1rem;
  left: 0.1rem;
  width: 2rem;
  height: 1.89rem;
  animation: mapFly 2s 1 normal forwards;
}

.map_bottom {
  margin: 0.3rem auto 0;
  font-size: 0.26rem;
  color: $mapBottom;
  text-align: center;
  letter-spacing: 5px;
}

.map_pop {
  @extend .pa_mid;
  padding: 1.05rem 0.2rem 0 0.2rem;
  width: 5.95rem;
  height: 9.68rem;
  background: url('../../assets/img/stageA/map_pop.png') 0 0/100% 100% no-repeat;
  text-align: center;
}

.map_popt {
  @extend .fm_hy;
  @extend .w100;
  margin-top: 0.1rem;
  display: table;
  height: 1.6rem;
  line-height: 0.6rem;
  font-size: 0.44rem;
  color: $winTop;
  & > span {
    display: table-cell;
    vertical-align: middle;
  }
}

.map_popm {
  padding: 0.9rem 0.5rem;
  height: 5.5rem;
  line-height: 0.54rem;
  font-size: 0.3rem;
  text-align: left;
  text-indent: 0.6rem;
  background: url('../../assets/img/stageA/map_inner.png') 0 0/100% 100% no-repeat;
  span {
    @extend .iblo;
    margin-right: 10px;
    font-size: 0.4rem;
    text-indent: 0;
    color: $bigRed;
  }
}

.close {
  @extend .pa;
  @extend .closeWH;
  left: 50%;
  transform: translate(-50%, 100%);
  bottom: 1.1rem;
  color: $resultClose;
  background: url('../../assets/img/stageA/map_btn.png') 0 0/100% 100% no-repeat;
}
</style>