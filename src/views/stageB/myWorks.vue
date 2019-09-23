<template>
  <div class="mywork_container">
    <div class="mywork_border">
      <img class="mywork_title" src="@/assets/img/stageB/title.png">
      <div class="mywork_main">
        <p class="mywork_ttips">您离大奖还差最后一步，选择一张满意作品参赛，就有机会获得黄鹤宝盒！</p>
        <div class="mywork_list">
          <div class="mywork_back" @click="goback">
            <img src="@/assets/img/stageB/upload.png">
            <span>立即上传</span>
          </div>
          <div :class="['mywork_item', 
                        (item.isEnter & item.isCheck == 1) ? 'mywork_join' : '', 
                        (item.isEnter & item.isCheck == 0) ? 'mywork_verify' : '',
                        (item.isEnter & item.isCheck == -1) ? 'mywork_nopass' : '']" 
              v-for="(item, index) in list"
              :key="index"
              :style="{'backgroundImage': `url(${item.imgUrl})`}"
              @click.stop="goPreview(item)">
              <span v-show="!item.isEnter && item.isCheck == 0"
                    :class="['square', item.selected ? 'square_selected' : '']"
                    @click.stop="item.selected = !item.selected"></span>
            </div>
        </div>
      </div>
      <div class="mywork_bottom">
        <div>
          <button type="button" @click="dele">删除</button>
          <button v-if="stages.value == 1" type="button" @click="join">参赛</button>
          <button v-if="stages.value == 2" type="button" @click="goThumbs">返回</button>
        </div>
        <p class="mywork_tips">仅可选择一张海报参赛哦！</p>
      </div>
      <page-bot/>
    </div>

    <pop-up :show="joinShow" v-on:popToggle="popToggle" :tipOne="tips"></pop-up>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { getMyWorks, joinMyWorks, delMyWorks } from '@/utils/service';

  interface IlistItem {
    memberId: string
    worksId: string
    userId: string
    imgUrl: string
    selected?: boolean
    isEnter: boolean
    isCheck: number
  }

  export default Vue.extend({
    name: 'myWorks',
    data () {
      return {
        list: [] as IlistItem[],
        joinShow: false,
        tips: '' as string,
      }
    },
    inject: ['stages'],
    mounted () {
      this.getList();
    },
    methods: {
      async getList () {
        let res = await getMyWorks();
        if (res) {
          res.forEach((item: IlistItem) => {
            item.selected = false;
          })
          this.list = res;
        }
      },
      async dele () {
        let selectArr = this.list.filter((item) => item.selected);
        if (selectArr.length == 0) return;
        let data = {
          userId: selectArr[0].userId,
          worksIds: [] as string[]
        };
        selectArr.forEach((item: IlistItem) => {
          data.worksIds.push(item.worksId)
        });
        let res = await delMyWorks(data);
        res && (this.list = this.list.filter((item) => !item.selected));
      },
      async join () {
        let selectArr = this.list.filter((item) => item.selected);
        let join = this.list.filter((item) => item.isEnter && item.isCheck == 1);
        if (join.length >= 1) {
          this.joinShow = true;
          this.tips = '您已有参赛作品，请勿重复参赛！';
          selectArr.forEach((item) => item.selected = false);
          return;
        };
        if (selectArr.length > 1) {
          this.joinShow = true;
          this.tips = '参赛作品超过上限！';
        } else if (selectArr.length == 1) {
          let res = await joinMyWorks({
            userId: selectArr[0].userId,
            worksId: selectArr[0].worksId,
          });
          if (res) {
            this.joinShow = true;
            this.tips = '工作人员将在24小时内审核您的参赛作品，如审核通过则不可更换参赛作品。每人仅可有一张作品参赛哦！';
            this.getList();
          }
        };
        selectArr.forEach((item) => item.selected = false);
      },
      popToggle (bool: boolean) {
        this.joinShow = bool;
      },
      goPreview (item: IlistItem) {
        this.$router.push({
          path: '/preview',
          query: {
            imgUrl: item.imgUrl,
            memberNum: this.list[0].memberId
          }
        })
      },
      goback () {
        this.$router.replace('/uploadPic');
      },
      goThumbs () {
        this.$router.replace('/thumbsUp');
      }
    }
  })
</script>

<style lang="scss" scoped>
.mywork_container {
  @extend .wh100;
  padding: 0.8rem 0.15rem 0.2rem;
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
  padding: 7% 3% 0;
  height: 81%;
}

.mywork_ttips {
  height: 12%;
  padding: 3% 10%;
  font-size: 0.26rem;
  color: $qrOrange;
  text-align: center;
  background: $mywordBg;
}

.mywork_back {
  @extend .pr;
  margin-right: 0.2rem;
  width: 2rem;
  height: 2.7rem;
  background: $white;
  border-radius: 10px;
  opacity: 0.5;
  font-size: 0.28rem;
  text-align: center;
  & > img {
    @extend .blo;
    margin: 0.6rem auto 0.5rem;
    width: 0.7rem;
    height: 0.7rem;
  }
}

.mywork_list {
  height: 90%;
  padding: 0 0.17rem 0.5rem;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  background: $mywordBg;
  & > .mywork_item {
    @extend .pr;
    margin-right: 0.2rem;
    margin-top: 0.35rem;
    width: 2rem;
    height: 2.7rem;
    background: url('') 0 0/100% 100% no-repeat;
  }
  & > .mywork_item:nth-child(1), & > .mywork_item:nth-child(2), & > .mywork_item:nth-child(3) {
    margin-top: 0;
  }
  & > .mywork_item:nth-child(3n) {
    margin-right: 0;
  }
}

.mywork_bottom {
  padding: 0 0.3rem;
  height: 15%;
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 64%;
  }
  button {
    @extend .fm_pf;
    width: 42%;
    height: 65%;
    background: url('../../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
    font-size: 0.30rem;
    color: $resultClose;
  }
}

.mywork_tips {
  margin-top: 0.15rem;
  font-size: 0.22rem;
  color: $LDDot;
  text-align: center;
}

.square {
  @extend .pa;
  right: 0.1rem;
  bottom: 0.1rem;
  width: 0.5rem;
  height: 0.6rem;
  border: 3px solid $ruleTitleRed;
  border-radius: 5px;
}

.mywork_join:after {
  content: '';
  @extend .pa;
  @extend .wh100;
  background: url('../../assets/img/stageB/join_mask.png') 0 0/100% 100% no-repeat;
}

.mywork_verify:after {
  content: '';
  @extend .pa;
  @extend .wh100;
  background: url('../../assets/img/stageB/verify_mask.png') 0 0/100% 100% no-repeat;
}

.mywork_nopass:after {
  content: '';
  @extend .pa;
  @extend .wh100;
  background: url('../../assets/img/stageB/nopass_mask.png') 0 0/100% 100% no-repeat;
}

.square_selected:after {
  content: ' ';
  @extend .pa;
  left: -3px;
  top: -0.1rem;
  width: 0.8rem;
  height: 0.8rem;
  background: url('../../assets/img/stageB/select.png') 0 0/100% 100% no-repeat;
}

</style>