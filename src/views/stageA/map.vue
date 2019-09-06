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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { adaptPt } from '@/utils/util';

export default Vue.extend({
  name: 'stageAmap',
  data (): any {
    return {
      show: false,
      mapGif: false,
      mapLight: false,
    }
  },
  mounted () {
    setTimeout(() => {
      this.mapGif = true;
      // setTimeout(() => {
      //   this.mapGif = false;
      //   this.mapLight = true;
      // }, 1500)
    }, 2000)
    this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom, this.$refs.moveTop));
  },
  methods: {
    goStageB () {
      if (!this.mapLight) return;
      this.$router.push('/myWorks')
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      if (from.path === '/home' && to.path === '/map') {
        vm.$data.mapLight = true;
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
</style>