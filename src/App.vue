<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
     name: 'app',
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
</style>
