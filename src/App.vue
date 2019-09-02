<template>
  <div id="app">
    <transition :name="transName">
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
         transName: 'slide_left'
       }
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

.slide_left-leave-active, .slide_left-leave-to {
  opacity: 0;
  transition: 0.5s;
}
</style>
