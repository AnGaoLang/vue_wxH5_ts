<template>
  <div class="map_container">
    <div class="map">
      <img v-show="mapGif" class="map_light" src="@/assets/img/stageA/map.gif">
      <img v-show="mapLight" class="map_light" src="@/assets/img/stageA/map_light.png">
      <img class="map_he" src="@/assets/img/stageA/he.gif">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'stageAmap',
  data () {
    return {
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
  }
})
</script>

<style lang="scss" scoped>
.map_container {
  @extend .wh100;
  padding-top: 4rem;
  background: url('../../assets/img/stageA/map_bg.png') 0 0/100% auto no-repeat;
}

.map {
  @extend .pr;
  width: 100%;
  height: 7.5rem;
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/img/stageA/map.png');
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
</style>