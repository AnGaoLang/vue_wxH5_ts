<template>
  <div class="pic_container" ref="top">
    <img class="pic_top" src="@/assets/img/stageB/zmzg.png">
    <div class="pic_mid" ref="screenShot">
      <div class="pic_frame" :style="`background: url(${picFrame[frameIndex]}) 0 0/100% 100% no-repeat`"></div>
      <img class="pic_tips" src="@/assets/img/stageB/tips.png" @click="photo" data-html2canvas-ignore>
      <span class="toggle_bgBtn" @click="toggleBg" data-html2canvas-ignore>切换背景板</span>
      <div class="pic_midbg" :style="`background-image: url(${newPhoto})`"></div>
    </div>
    <div class="pic_bot">
      <button type="button" @click="goMyWork" ref="bottom">我的作品</button>
      <button type="button" @click="uploapPic">确认上传</button>
    </div>
    <page-bot style="margin-top: 0.3rem;"/>
    <pic-clip :show="picClipShow" 
              :img-src="picClipImg"
              :clipWHRatio="0.91"
              :compressRatio="this.compressRatio"
              @hide="picClipHide"
              @finish="finish"></pic-clip>
    <pop-up :show="joinShow" v-on:popToggle="popToggle" :tipOne="tips"></pop-up>
  </div>
</template>

<script lang="ts">
  /// <reference path="./wx-js-sdk.d.ts">
  import wx from 'weixin-js-sdk';
  import Vue from 'vue';
  import picClip from '@/components/picClip.vue';
  import html2canvas from 'html2canvas';
  import { adaptPt, getImgSize, base64ToBlob } from '@/utils/util';
  import { uploadPic } from '@/utils/service';

  export default Vue.extend({
    name: 'uploadPic',
    data (): any {
      return {
        joinShow: false,
        picFrame: [
          require('@/assets/img/stageB/pic_frameA.png'),
          require('@/assets/img/stageB/pic_frameB.png'),
          require('@/assets/img/stageB/pic_frameC.png')
        ],
        tips: '',
        frameIndex: 0,
        picClipImg: '',
        picClipShow: false,
        newPhoto: '',
        compressRatio: 1,
        asd: ''
      }
    },
    components: {
      'pic-clip': picClip
    },
    mounted () {
      this.frameIndex = Math.round(Math.random() * 2);
      this.$nextTick(() => adaptPt(this.$refs.top, this.$refs.bottom));
    },
    methods: {
      popToggle (bool: boolean) {
        this.joinShow = bool;
      },
      toggleBg () {
        this.frameIndex++;
        this.frameIndex > 2 && (this.frameIndex = 0);
      },
      photo () {
        wx.ready(() => {
          wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: (res) => {
              wx.getLocalImgData({
                localId: res.localIds[0],
                success: (resData) => {
                  let imgSrc: string;
                  if (resData.localData.indexOf('base64') > -1) {
                    imgSrc = resData.localData;
                  } else {
                    let base64 = `data:image/jpeg;base64,${resData.localData}`;
                    imgSrc = base64.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
                  };
                  // alert(getImgSize(imgSrc))
                  if (getImgSize(imgSrc) > 100) {
                    this.compressRatio = 0.99;
                  };
                  this.picClipImg = imgSrc;
                  this.picClipShow = true;
                }
              });
            }
          });
        });
      },
      finish (res: any) {
        // alert(res + '');
        // alert(res.size / 1024);
        this.newPhoto = URL.createObjectURL(res);
      },
      picClipHide (res: boolean) {
        this.picClipShow = res;
      },
      goMyWork () {
        this.$router.replace('/myWorks')
      },
      uploapPic () {
        if (!this.newPhoto) {
          this.joinShow = true;
          this.tips = '亲，请选择照片上传！';
          return;
        };
        // this.newPhoto = require('@/assets/img/big.png');
        this.$nextTick(() => {
          html2canvas(this.$refs.screenShot, {
            allowTaint: true,
            backgroundColor: '#c72930'
          }).then((canvas) => {
            let data = canvas.toDataURL('image/jpeg', 0.8);
            let blob = base64ToBlob(data);
            // alert(blob.size / 1024);
            let formData = new FormData();
            formData.append('file', blob ? blob : '');
            uploadPic(formData).then((res) => {
              this.$router.replace('/myWorks');
            });
            // canvas.toBlob((blob) => {
            //   let formData = new FormData();
            //   formData.append('file', blob ? blob : '');
            //   uploadPic(formData).then((res) => {
            //     this.$router.replace('/myWorks');
            //   })
            // })
          }).catch((res) => {
            // alert(res)
            // alert(res);
            this.tips = '上传图片过大，请重新选择上传！';
            this.newPhoto = '';
          })
        })
      }
    }
  })
</script>

<style>
body, html {
  overflow: auto;
  background: #c72930;
}
</style>
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
    z-index: 15;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
    width: 2.7rem;
    height: auto;
    cursor: pointer;
  }
}

.pic_bot {
  @extend .pr;
  display: flex;
  padding: 0 0.3rem;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  & > button {
    @extend .fm_pf;
    width: 3.05rem;
    height: 0.8rem;
    background: url('../../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
    font-size: 0.30rem;
    color: $resultClose;
  }
}
.toggle_bgBtn {
  @extend .pa;
  right: 0.4rem;
  bottom: 0.4rem;
  z-index: 15;
  padding: 0.15rem 0.2rem;
  font-size: 0.22rem;
  color: $qrOrange;
  background: $bigRed;
  border-radius: 5px;
  cursor: pointer;
}
</style>