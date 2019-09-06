<template>
  <div class="mywork_container">
    <div class="mywork_border">
      <img class="mywork_title" src="@/assets/img/stageB/title.png">
      <div class="mywork_main"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'myWorks',
  })
</script>

<style lang="scss" scoped>
.mywork_container {
  @extend .wh100;
  padding: 1.3rem 0.15rem 0.2rem;
}

.mywork_border {
  @extend .pr;
  @extend .wh100;
  background: url('../../assets/img/stageB/border.png') 0 0/100% 100% no-repeat;
}

.mywork_title {
  @extend .pa;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.8rem;
  height: auto;
}

.mywork_main {
  height: 87.5%;
}
</style>