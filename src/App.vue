<template>
  <div id="app">
    <transition name="opacity">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'app',
    data () {
      return {
        timmer: 0,
        stage: -1
      }
    },
    provide (): any {
      return {
        stage: this.stage
      }
    },
    mounted () {
      this.timmer = setInterval(() => this.initStage(), 1000);
    },
    methods: {
      initStage () {
        const nowDate = new Date().getTime();
        console.log(new Date())
        const stageATime = new Date('2019-9-13 00:00:00').getTime();
        const stageBTime = new Date('2019-9-20 00:00:00').getTime();
        const stageCTime = new Date('2019-9-27 00:00:00').getTime();
        const stageEnd = new Date('2019-10-8 00:00:00').getTime();
        if (nowDate >= stageATime && nowDate < stageBTime) {
          this.stage = 0;
        } else if (nowDate >= stageBTime && nowDate < stageCTime) {
          this.stage = 1;
        } else if (nowDate >= stageCTime && nowDate < stageEnd) {
          this.stage = 2;
        } else {
          this.stage = 3;
        }
      },
    }
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
  transition: 0.5s;
}
</style>
