<template>
  <div class="pic_container" ref="top">
    <img class="pic_top" src="@/assets/img/stageB/zmzg.png">
    <div class="pic_mid" ref="screenShot">
      <img class="pic_frame" :src="picFrame[frameIndex]">
      <img v-if="tipsShow" class="pic_tips" src="@/assets/img/stageB/tips.png" @click="photo">
      <div class="pic_midbg" :style="`background-image: url(${newPhoto})`"></div>
    </div>
    <div class="pic_bot">
      <button type="button" @click="goMyWork" ref="bottom">我的作品</button>
      <button type="button" @click="uploapPic">确认上传</button>
    </div>
  </div>
</template>

<script lang="ts">
  /// <reference path="./wx-js-sdk.d.ts">
  import wx from 'weixin-js-sdk';
  import Vue from 'vue';
  import html2canvas from 'html2canvas';
  import { adaptPt } from '@/utils/util';
  import { uploadPic } from '@/utils/service';

  export default Vue.extend({
    name: 'uploadPic',
    data (): any {
      return {
        picFrame: [
          require('@/assets/img/stageB/pic_frameA.png'),
          require('@/assets/img/stageB/pic_frameB.png'),
          require('@/assets/img/stageB/pic_frameC.png')
        ],
        tipsShow: true,
        frameIndex: 0,
        newPhoto: '',
      }
    },
    mounted () {
      this.frameIndex = Math.round(Math.random() * 2);
      this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom));
    },
    methods: {
      photo () {
        wx.ready(() => {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              this.$loading.show();
              // this.newPhoto = res.localIds;
              wx.getLocalImgData({
                localId: res.localIds[0],
                success: (resData) => {
                  if (resData.localData.indexOf('base64') > -1) {
                    this.newPhoto = resData.localData;
                  } else {
                    let base64 = `data:image/jpeg;base64,${resData.localData}`;
                    base64 = base64.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
                    this.newPhoto = base64;
                  };
                  this.$loading.hide();
                }
              });
            },
            complete: () => {
              this.$loading.hide();
            }
          });
        });
      },
      goMyWork () {
        this.$router.replace('/myWorks')
      },
      uploapPic () {
        if (!this.newPhoto) return;
        this.$loading.show();
        this.tipsShow = false;
        this.$nextTick(() => {
          html2canvas(this.$refs.screenShot, {
            backgroundColor: 'transparent'
          }).then((canvas) => {
            canvas.toBlob((blob) => {
              let formData = new FormData();
              formData.append('file', blob ? blob : '');
              uploadPic(formData).then((res) => {
                alert(JSON.stringify(res));
                this.$router.replace('/myWorks');
              })
            })
          })
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
.pic_container {
  @extend .wh100;
  padding-top: 0.8rem;
  background: url('../../assets/img/stageB/upload_bg.png') 0 0/100% auto no-repeat;
}
.pic_top {
  @extend .blo;
  width: 100%;
  height: 2.5rem;
}
.pic_mid {
  @extend .pr;
  margin: -0.9rem 0.4rem 0.35rem;
  height: 8.65rem;
  & > .pic_frame {
    @extend .pr;
    @extend .wh100;
    z-index: 10;
  }
  & > .pic_midbg {
    @extend .pa;
    z-index: 9;
    top: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 80%;
    background-color: #fff;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
  & > .pic_tips {
    @extend .pa;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
    width: 2.7rem;
    height: auto;
  }
}
.pic_bot {
  @extend .pr;
  display: flex;
  padding: 0 0.3rem;
  justify-content: space-around;
  align-items: center;
  & > button {
    @extend .fm_pf;
    width: 3.05rem;
    height: 0.8rem;
    background: url('../../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
    font-size: 0.30rem;
    color: $resultClose;
  }
}
</style>