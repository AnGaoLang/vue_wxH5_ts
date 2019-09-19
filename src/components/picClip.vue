<template>
  <div class="pic_clip" v-if="picShow">
    <canvas ref="canvas"></canvas>
    <div class="clip_bottom">
      <span @click="cancel">取消</span>
      <span @click="confirm">确认</span>
    </div>
  </div>
</template>

<script>
import exif from "exif-js";
export default {
  data () {
    return {
      picShow: false,
      one: false, // 单指还是双指,不然会出现双指缩放与单指移动互相影响的情况
      imgSrcs: "", // canvas渲染的图片
      ctx: {}, // canvas实例
      img: {}, // img实例
      width: 0, // canvas宽
      height: 0, // canvas高
      imgWidth: 0, //图片宽度
      imgHeight: 0, // 图片高度
      startScreen: undefined, // 触摸点坐标
      endScreen: { x: 0, y: 0 }, // 结束触摸点坐标
      posImg: { x: 0, y: 0 }, // 照片移动的距离
      imageData: {}, // 裁剪区域的canvas信息值
      base64: "", // 头像的base64
      data: [], // 头像的二进值
      isMove: true, // 是否能拖动图片
      widthRate: 1, // 图片缩放比例
      endImgWidth: 0, // 图片最后宽度
      endImgHeight: 0, // 图片最后高度
      scaleStart: {
        // 双指开始触摸点
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      scaleMove: {
        // 双指结束触摸点
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
    };
  },
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    clipWHRatio: {
      type: Number,
      default: 1
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (val) {
      this.picShow = val;
      val && this.$nextTick(() => this.init());
    }
  },
  methods: {
    // 初始化
    init () {
      this.imgDirection();
      this.bindTouchEvents();
      this.isMove = true;
    },
    // 确认按钮，裁剪图像
    confirm () {
      this.isMove = false;;
      const rectWidth = this.width * 0.8;
      // const rectHeight = this.height * 0.8;
      const rectHeight = this.clipWHRatio ? (rectWidth / this.clipWHRatio) : rectWidth;
      const rectX = this.width * 0.1;
      // const rectY = (this.height - rectWidth) / 3;
      const rectY = (this.$el.getBoundingClientRect().height - rectHeight) / 3;
      this.drawClear();
      this.ctx.drawImage(
        this.img,
        (-this.posImg.x + rectX) * (this.img.width / this.imgWidth),
        (-this.posImg.y + rectY) * (this.img.height / this.imgHeight),
        rectWidth * (this.img.width / this.imgWidth),
        rectHeight * (this.img.height / this.imgHeight),
        rectX,
        rectY,
        rectWidth,
        rectHeight
      );

      this.imageData = this.ctx.getImageData(rectX, rectY, rectWidth, rectHeight);
      this.makeHeader(rectWidth, rectHeight);
      this.drawRect();
      this.cancel();
    },
    // 取消裁切
    cancel () {
      this.picShow = false;
      this.$emit('hide', false);
    },
    // 判断图片方向
    imgDirection () {
      this.$nextTick(() => {
        const img = new Image();
        img.src = this.imgSrc;

        let rate = 1;

        img.onload = () => {
          // this.imgSrcs = this.imgSrc;
          // this.initCanvas();
          // 获得图片方向
          exif.getData(img, () => {
            this.orientation = exif.getTag(img, "Orientation");
          });
          // 6说明是正向的手机相片
          if (this.orientation == 6) {
            // undefined证明不是手机拍照相片为网络图片不做处理
          } else {
            this.imgSrcs = this.imgSrc;
            this.initCanvas();
            return;
          }
          const width = this.$el.getBoundingClientRect().width;
          const height = this.$el.getBoundingClientRect().height;
          const canvas3 = document.createElement("canvas");
          const ctx3 = canvas3.getContext("2d");
          const fwidth = img.height;
          const fheight = img.width;

          // 如果是相机图片则旋转90度
          if (fwidth / width > 1) {
            rate = fwidth / width;
          }

          const imgWidth = fwidth / rate;
          const imgHeight = fheight / rate;

          canvas3.width = imgWidth;
          canvas3.height = imgHeight;

          ctx3.translate(0.5 * imgWidth, 0.5 * imgHeight);
          ctx3.rotate(90 * Math.PI / 180);
          ctx3.translate(-0.5 * imgHeight, -0.5 * imgWidth);

          ctx3.drawImage(img, 0, 0, imgHeight, imgWidth);

          const base64 = canvas3.toDataURL();
          this.imgSrcs = base64;
          this.initCanvas();
        };
      });
    },
    // 初始化canvas
    initCanvas () {
      this.$nextTick(() => {
        const C = this.$refs.canvas;
        // 宽高等于容器宽高
        C.width = this.$el.getBoundingClientRect().width;
        C.height = this.$el.getBoundingClientRect().height;
        const ctx = C.getContext("2d");

        const img = new Image();

        img.src = this.imgSrcs;
        this.ctx = ctx;
        this.img = img;
        this.width = C.width;
        this.height = C.height;
        let rate = 1;
        
        img.onload = () => {
          rate = img.width / (C.width * 0.8);
          const rectWidth = this.width * 0.8;
          // const rectHeight = this.height * 0.8;
          const rectHeight = this.clipWHRatio ? (rectWidth / this.clipWHRatio) : rectWidth;
          const rectX = this.width * 0.1;
          // const rectY = (this.height - rectWidth) / 3;
          const rectY = (this.$el.getBoundingClientRect().height - rectHeight) / 3;
          this.imgWidth = img.width / rate;
          this.imgHeight = img.height / rate;
          this.posImg = { x: rectX, y: rectY };

          this.drawImg(ctx, img, rectX, rectY, this.imgWidth, this.imgHeight);
          // 裁剪框
          this.drawRect();
        };
      });
    },
    // 画图像
    drawImg (ctx, img, x, y, width, height) {
      this.drawClear(ctx);
      ctx.drawImage(img, x, y, width, height);
      this.drawRect();
    },
    // 画剪切框, 分为上下左右四个黑色部分，中间是个白色框
    drawRect () {
      const rectWidth = this.width * 0.8;
      const rectHeight = this.clipWHRatio ? (rectWidth / this.clipWHRatio) : rectWidth;
      const rectX = this.width * 0.1;
      // const rectY = (this.height - rectWidth) / 2;
      const rectY = (this.$el.getBoundingClientRect().height - rectHeight) / 3;

      this.ctx.fillStyle = "rgba(0,0,0,.3)";
      this.ctx.fillRect(0, 0, this.width, rectY);
      this.ctx.fillRect(0, rectY, rectX, rectHeight);
      this.ctx.fillRect(rectX + rectWidth, rectY, rectX, rectHeight);
      this.ctx.fillRect(0, rectY + rectHeight, this.width, this.height);

      this.ctx.strokeStyle = "#fff";
      this.ctx.lineWidth = "2";
      this.ctx.strokeRect(rectX, rectY, rectWidth, Math.ceil(rectHeight));
    },
    // 清楚画布
    drawClear (ctx = this.ctx) {
      ctx.clearRect(0, 0, this.width, this.height);
    },
    // 生成base64
    makeHeader (rectWidth, rectHeight) {
      const canvas2 = document.createElement("canvas");
      const ctx2 = canvas2.getContext("2d");
      canvas2.width = rectWidth;
      canvas2.height = rectHeight;
      ctx2.putImageData(this.imageData, 0, 0);
      const base64 = canvas2.toDataURL("image/jpeg", 0.7);
      this.data = this.convertBase64UrlToBlob(base64);
      this.base64 = base64;
      console.log(base64)
      this.$emit("finish", this.base64);
    },
    // 获得base64
    // getBase64Url() {
    //   return this.base64;
    // },
    // // 获得二进制数据
    // getData() {
    //   return this.data;
    // },
    // base64转blob
    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
    // bolb转file对象
    convertBlobUrlToFile (blob) {
      return new File([blob], '1.jpg', {type: 'image/jpeg', lastModified: Date.now()});
    },
    bindTouchEvents () {
      if (this.$refs.canvas) {
        this.$refs.canvas.addEventListener("touchstart", this.handleTouchStart);
        this.$refs.canvas.addEventListener("touchmove", this.handleTouchMove);
        this.$refs.canvas.addEventListener("touchend", this.handleTouchEnd);
      }
    },
    handleTouchStart (e) {
      if (!this.isMove) return;
      if (e.touches.length == 1) {
        let x = e.touches[0].screenX;
        let y = e.touches[0].screenY;
        this.startScreen = { x, y };
        this.one = true;
        return;
      }

      if (e.touches.length == 2) {
        // 以左面手指位置为准
        let x =
          e.touches[0].screenX <= e.touches[1].screenX
            ? e.touches[0].screenX
            : e.touches[1].screenX;
        let y =
          e.touches[0].screenX <= e.touches[1].screenX
            ? e.touches[0].screenY
            : e.touches[1].screenY;
        this.startScreen = { x, y };
        this.scaleStart = {
          x1: e.touches[0].screenX,
          y1: e.touches[0].screenY,
          x2: e.touches[1].screenX,
          y2: e.touches[1].screenY
        };
        this.one = false;
        return;
      }
      // 重制最后图片大小等于现在图片大小
      // this.widthRate = 1;
      // this.endImgWidth = this.imgWidth;
      // this.endImgHeight = this.imgHeight;
    },
    handleTouchMove (e) {
      e.preventDefault();
      if (!this.isMove) return;
      if (e.touches.length == 1 && this.one) {
        let x = e.touches[0].screenX;
        let y = e.touches[0].screenY;
        let mx = x - this.startScreen.x + this.posImg.x;
        let my = y - this.startScreen.y + this.posImg.y;
        let maxX = this.$el.getBoundingClientRect().width - this.imgWidth;
        let maxY = this.$el.getBoundingClientRect().height - this.imgHeight;
        this.drawImg(this.ctx, this.img, mx, my, this.imgWidth, this.imgHeight);

        this.endImgWidth = this.imgWidth;
        this.endImgHeight = this.imgHeight;

        this.endScreen = {
          x: mx,
          y: my
        };
        return;
      }

      if (e.touches.length == 2  && !this.one) {
        let x =
          e.touches[0].screenX <= e.touches[1].screenX
            ? e.touches[0].screenX
            : e.touches[1].screenX;
        let y =
          e.touches[0].screenX <= e.touches[1].screenX
            ? e.touches[0].screenY
            : e.touches[1].screenY;
        let mx = x - this.startScreen.x + this.posImg.x;
        let my = y - this.startScreen.y + this.posImg.y;
        this.scaleMove = {
          x1: e.touches[0].screenX,
          y1: e.touches[0].screenY,
          x2: e.touches[1].screenX,
          y2: e.touches[1].screenY
        };
        // 缩小的比例
        let widthRate = (
          (Math.abs(this.scaleStart.x2 - this.scaleStart.x1) -
            Math.abs(this.scaleMove.x2 - this.scaleMove.x1)) /
          Math.abs(this.scaleStart.x2 - this.scaleStart.x1)
        ).toFixed(2);
        this.widthRate = widthRate;
        let imgWidth = this.imgWidth - this.imgWidth * this.widthRate;
        let imgHeight = this.imgHeight - this.imgHeight * this.widthRate;
        this.drawImg(this.ctx, this.img, mx, my, imgWidth, imgHeight);
        this.endImgWidth = imgWidth;
        this.endImgHeight = imgHeight;
        this.endScreen = {
          x: mx,
          y: my
        };
        return;
      }
    },
    handleTouchEnd (e) {
      if (!this.isMove) return;
      this.posImg = this.endScreen;
      this.imgWidth = this.endImgWidth;
      this.imgHeight = this.endImgHeight;
      this.scaleStart = this.scaleMove;
    }
  }
};
</script>
<style scoped>
.pic_clip {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;  
  z-index: 20000;
  background: rgb(0, 0, 0);
  overflow: hidden;
}
.clip_bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10%;
  font-size: 14px;
  color: #42b983;
}
.clip_bottom > span {
  padding: 7px 25px;
  background: #fff;
  border-radius: 5px;
}
.clip_bottom > span:first-child {
  color: #d43736;
}
</style>