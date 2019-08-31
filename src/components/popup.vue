<template>
  <div class="mask" v-show="show">
    <div class="pop">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'popUp',
  data () {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.mask {
  @extend .pfFull;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
}
.pop {
  @extend .pa_mid;
  @extend .w100;
}
</style>