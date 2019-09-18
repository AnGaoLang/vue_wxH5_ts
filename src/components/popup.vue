<template>
  <div class="mask" v-show="show">
    <div class="pop">
      <slot>
        <div class="popup_result">
          <div class="result_bg">
            <img src="@/assets/img/stageA/exhaust.png">
            <p>{{tipOne}}</p>
            <p>{{tipTwo}}</p>
          </div>
          <div class="close" @click="hide">确定</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'popUp',
  data (): any {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tipOne: {
      type: String,
      default: ''
    },
    tipTwo: {
      type: String,
      default: ''
    }
  },
  methods: {
    hide () {
      this.$emit('popToggle', false);
    }
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

.popup_result {
  @extend .pa_mid;
  width: 6.05rem;
  height: 7.8rem;
  .close {
    @extend .pa;
    left: 50%;
    transform: translate(-50%, 100%);
    bottom: 1rem;
    color: $resultClose;
    background: url('../assets/img/stageA/map_btn.png') 0 0/100% 100% no-repeat;
  }
}

.result_bg {
  padding: 0.65rem 0.38rem 0.38rem;
  width: 6.05rem;
  height: 6.05rem;
  background: url('../assets/img/stageA/map_inner.png') 0 0/100% 100% no-repeat;
  & > img {
    @extend .blo;
    @extend .mAu;
    margin-bottom: 0.2rem;
    width: 2.28rem;
    height: auto;
  }
  & > p{
    @extend .fm_ss;
    font-size: 0.38rem;
    color: $exhaust;
    line-height: 0.8rem;
    text-align: center;
    & > span {
      color: $ruleTitleRed;
    }
  }
}

.close {
  @extend .pa;
  @extend .closeWH;
  left: 50%;
  transform: translate(-50%, 100%);
  bottom: 1.1rem;
  color: $resultClose;
  background: url('../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
}
</style>