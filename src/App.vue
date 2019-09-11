<template>
  <div id="app">
    <img class="outer_view" src="@/assets/img/stageA/he.gif">
    <img class="outer_view" src="@/assets/img/stageA/he.png">
    <img class="outer_view" src="@/assets/img/stageA/tree.png">
    <img class="outer_view" src="@/assets/img/stageA/hhsf.png">
    <img class="outer_view" src="@/assets/img/stageA/hh.png">
    <img class="outer_view" src="@/assets/img/main/title_l.png">
    <img class="outer_view" src="@/assets/img/main/title_t.png">
    <img class="outer_view" src="@/assets/img/main/title_r.png">
    <img class="outer_view" src="@/assets/img/main/bottom.png">
    <img class="outer_view" src="@/assets/img/main/bottom_louA.png">
    <img class="outer_view" src="@/assets/img/main/bottom_louB.png">
    <img class="outer_view" src="@/assets/img/main/bottom_moon.png">
    <!-- <transition name="opacity"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'app',
    data () {
      return {
        timmer: 0,
        stages: {
          value: -1,
        }
      }
    },
    provide (): object {
      return {
        stages: this.stages
      }
    },
    mounted () {
      this.initStage();
      this.timmer = setInterval(() => this.initStage(), 1000);
    },
    methods: {
      initStage () {
        // 判断的活动开启时间
        const nowDate = new Date().getTime();
        const stageATime = new Date('2019/9/1 00:00:00').getTime();
        const stageBTime = new Date('2019/9/13 00:00:00').getTime();
        const stageCTime = new Date('2019/09/27 00:00:00').getTime();
        const stageEnd = new Date('2019/10/08 00:00:00').getTime();
        if (nowDate >= stageATime && nowDate < stageBTime) {
          this.stages.value = 0;
        } else if (nowDate >= stageBTime && nowDate < stageCTime) {
          this.stages.value = 1;
        } else if (nowDate >= stageCTime && nowDate < stageEnd) {
          this.stages.value = 2;
        } else if (nowDate >= stageEnd) {
          this.stages.value = 3;
        }
      },
    },
  });
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $bigRed;
}

.opacity-leave-active, .opacity-leave-to {
  opacity: 0;
  transition: 0.4s;
}
</style>
