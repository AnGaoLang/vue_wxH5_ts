<template>
  <div class="mask" v-show="showLoad">
    <div class="loading">
      <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'loading',
  data () {
    return {
      showLoad: false
    }
  },
  methods: {
    show() {
      this.showLoad = true;
    },
    hide() {
      this.showLoad = false;
    }
  }
})
</script>

<style lang="scss" scoped>
.mask {
  @extend .pfFull;
  z-index: 100;
  background: rgba(0, 0, 0, 0);
}
.loading {
  @extend .pa_mid;
  padding: 25px 0;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
}

.circular {
  height: 50px;
  width: 50px;
  animation: loading-rotate 2s linear infinite;
}

.path {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #fff;
  stroke-linecap: round;
  animation: loading-dash 1.5s ease-in-out infinite;
}

@keyframes loading-rotate{
  to {
    transform: rotate(1turn);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px
  }
}
</style>