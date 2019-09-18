<template>
  <div class="preview_container" ref="top">
    <div class="preview_box">
      <img class="top_img" ref="topImg">
      <!-- <img class="top_img" ref="topImg" @mousedown="getPic"> -->
      <img class="preview_title" src="@/assets/img/main/zmzg_title.png">
      <img class="preview_main" :src="imgUrl">
      <div class="preview_bottom" ref="bottom">
        <div class="qr">
          <!-- <img src="@/assets/img/stageB/qr.png">
          <div class="qr_text">
            <p>编号：236589</p>
            <p>识别二维码</p>
            <p>制作您的专属海报</p>
          </div> -->
        </div>
        <div v-show="isAlready" class="preview_btn">长按保存海报</div>
      </div>
    </div>
    <div class="preview_box preview_boxA" ref="playbill">
      <img class="preview_title" src="@/assets/img/main/zmzg_title.png">
      <img class="preview_main" :src="imgUrl" ref="mainImg">
      <div class="preview_bottom">
        <div class="qr">
          <img src="@/assets/img/stageB/qr.png">
          <div class="qr_text">
            <p>编号：{{memberNum}}</p>
            <p>识别二维码</p>
            <p>制作您的专属海报</p>
          </div>
        </div>
        <!-- <div class="preview_btn">长按保存海报</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import html2canvas from 'html2canvas';
import { adaptPt } from '@/utils/util';

export default Vue.extend({
  name: 'preview',
  data (): any {
    return {
      imgUrl: '' as string | Array<string | null>,
      memberNum: '',
      isAlready: false,
    }
  },
  mounted () {
    this.imgUrl = this.$route.query.imgUrl;
    this.memberNum = this.$route.query.memberNum;
    this.$nextTick(() => {
      adaptPt(this.$refs.top, this.$refs.bottom);
      this.$refs.mainImg.onload = () => {
        setTimeout(() => this.getPic(), 1000);
        // this.getPic()
        // this.convertImgToBase64(() => this.getPic());
      };
    });
  },
  methods: {
    convertImgToBase64 (callback: any) {
      function getBase64Image (img: any) {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx && ctx.drawImage(img, 0, 0, img.width, img.height);
        let dataURL = canvas.toDataURL('image/png');
        return dataURL;
      };
      let tempImage = this.$refs.mainImgA;
      tempImage.setAttribute('crossOrigin', 'Anonymous');
      console.log(getBase64Image(tempImage))
      this.imgUrl = getBase64Image(tempImage);
      callback && callback();
    },
    blobToDataURL(blob: any, callback: any) {
      let a = new FileReader();
      a.onload = (e: any) => { callback(e.target.result) }
      a.readAsDataURL(blob);
    },
    getPic () {
      html2canvas(this.$refs.playbill, {
        backgroundColor: '#c72930'
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          this.blobToDataURL(blob, (res: string) => {
            this.$refs.topImg.src = res;
            this.isAlready = true;
          })
          // let url = URL.createObjectURL(blob);
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.preview_container {
  @extend .pr;
  background: url('../../assets/img/stageB/upload_bg.png') 0 0/100% 100% no-repeat;
}

.top_img {
  @extend .pa;
  @extend .wh100;
  top: 0;
  opacity: 0;
}

.preview_box {
  @extend .pr;
  padding-top: 1px;
  z-index: 10;
}

.preview_boxA {
  @extend .pa;
  top: -99999px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
}

.preview_title {
  @extend .blo;
  margin: 0.45rem auto 0.35rem;
  width: 5.45rem;
  height: 0.72rem;
}

.preview_main {
  @extend .blo;
  @extend .mAu;
  margin-bottom: 0.22rem;
  width: 6.65rem;
  height: 8.65rem;
}

.preview_bottom {
  display: flex;
  margin: 0 0.45rem 0.15rem;
  justify-content: space-between;
  align-items: center;
  height: 1.35rem;
}

.preview_btn {
  @extend .fm_hyc;
  padding: 0 0.3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.32rem;
  color: $previewRed;
  background: url('../../assets/img/stageB/save.png') 0 0/100% 100% no-repeat;
}

.qr {
  display: flex;
  & > img {
    margin-right: 0.3rem;
    width: 1.35rem;
    height: 1.35rem;
  }
}

.qr_text {
  @extend .fm_hyc;
  padding-top: 0.1rem;
  font-size: 0.28rem;
  color: $qrOrange;
  & > p:first-child {
    @extend .fm_pf;
    font-size: 0.3rem;
    color: $white;
  }
}
</style>