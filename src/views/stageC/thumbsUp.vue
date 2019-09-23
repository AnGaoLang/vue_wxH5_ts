<template>
  <div class="thumbs_container">
    <div class="placeholder"></div>
    <div class="thumbs_top">
      <img src="@/assets/img/stageC/thumbs_top.png">
    </div>
    <div class="thumbs_main">
      <div class="thumbs_input">
        <input type="number" placeholder="请输入楼主编号" v-model="curMemberId">
        <span @click="search">
          <img src="@/assets/img/stageC/search.png">
        </span>
      </div>
      <div class="thumbs_box" @scroll="scrollThum">
        <div class="thumbs_item" 
             v-for="(item, index) in thumbsList" 
             :key="index"
             :style="{'backgroundImage': `url(${item.imgUrl})`}">
              <div class="thumbs_item_top">
                <p>编号:{{item.memberId}}</p>
                <p>{{item.likeNum}}票</p>
              </div>
              <div class="thumbs_item_bot" @click="clickLike(item)">
                <img v-show="!item.islike" src="@/assets/img/stageC/thumbs.png">
                <img v-show="item.islike" src="@/assets/img/stageC/thumbs_light.png">
              </div>
             </div>
      </div>
      <div class="thumbs_bottom">
        <button type="button" @click="goMyWork">我的作品</button>
        <button type="button" @click="goback">返回</button>
      </div>
      <div class="bot_mask"></div>
    </div>
    <page-bot style="margin-top: 0.6rem"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { findAll, like } from '@/utils/service';

interface IthumbsList {
  imgUrl: string
  isCheck: number
  isEnter: boolean
  islike: boolean
  likeNum: number
  memberId: string
  userId: string
  worksId: string
}

export default Vue.extend({
  name: 'thumbsUp',
  data () {
    return {
      pageNum: 1,
      pageSize: 12,
      rowCount: 0,
      isScroll: false,
      thumbsList: [] as IthumbsList[],
      curMemberId: ''
    }
  },
  mounted () {
    this.getList('', this.pageNum);
  },
  methods: {
    async getList (memberId: string = '', pageNum, nextPage: boolean = false) {
      console.log(pageNum)
      let res = await findAll({
        memberId,
        pageNum,
        pageSize: this.pageSize
      });
      this.isScroll = false;
      if (res) {
        this.rowCount = res.rowCount;
        if (nextPage) {
          this.thumbsList = this.thumbsList.concat(res.dataList)
        } else {
          this.thumbsList = res.dataList;
        }
      };
    },
    async clickLike (item: IthumbsList) {
      if (item.islike) return;
      let res = await like({
        userId: item.userId,
        worksId: item.worksId
      });
      if (res) {
        item.islike = true;
        item.likeNum++;
      };
    },
    scrollThum (e) {
      if (this.isScroll) return;
      const curDom = e.currentTarget;
      const scrollH = curDom.scrollHeight;
      const scrollTop = curDom.scrollTop;
      const offsetH = curDom.offsetHeight;
      console.log(123)
      if (this.thumbsList.length < this.rowCount && (offsetH + scrollTop) >= (scrollH - 10)) {
        console.log(456)
        this.isScroll = true;
        this.pageNum++;
        this.getList('', this.pageNum, true);
      }
    },
    search () {
      this.pageNum = 1;
      this.getList(this.curMemberId, this.pageNum);
    },
    goback () {
      this.$router.replace('/home');
    },
    goMyWork () {
      this.$router.replace('/myWorks');
    }
  }
})
</script>
<style lang="scss" scoped>
.thumbs_container {
  @extend .h100;
  @extend .pr;
  background: url('../../assets/img/stageC/thumbs_bg.png') 0 0/100% auto no-repeat;
}

.placeholder {
  height: 4%;
}

.thumbs_top {
  @extend .mAu;
  & > img {
    @extend .blo;
    @extend .mAu;
    width: 70%;
    height: auto;
  }
}

.thumbs_main {
  @extend .pr;
  display: flex;
  flex-direction: column;
  margin: 0 0.15rem;
  padding: 0.3rem 4% 0.28rem;
  height: 75%;
  background: url('../../assets/img/stageC/list_bg.png') 0 0/100% 100%;
}

.thumbs_box,.thumbs_input,.thumbs_box {
  display: flex;
}

.thumbs_input {
  height: 0.75rem;
  flex-basis: 0.75rem;
  flex-shrink: 0;
  flex-grow: 0;
  & > input {
    padding: 5%;
    width: 79%;
    border: 1px solid $searchBor;
    border-right: none;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center; 
    width: 21%;
    border: 1px solid $searchBor;
    border-left: none;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    background: #f69655;
    cursor: pointer;
    & > img {
      height: 70%;
    }
  }
}

.thumbs_box {
  margin-top: 0.28rem;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-y: auto;
  & > .thumbs_item:nth-child(1),& > .thumbs_item:nth-child(2),& > .thumbs_item:nth-child(3) {
    margin-top: 0;
  }
  & > .thumbs_item:nth-child(3n) {
    margin-right: 0;
  }
  & > .thumbs_item:last-child {
    margin-bottom: 1.05rem;
  }
}

.thumbs_item {
  @extend .pr;
  margin-top: 0.28rem;
  margin-right: 0.20rem;
  width: 2.05rem;
  height: 2.7rem;
  flex-basis:2.05rem;
  flex-grow: 0;
  flex-shrink: 0;
  background: url() 0 0/100% 100% no-repeat;
  border-radius: 6px;
}

.thumbs_item_top {
  @extend .pa;
  @extend .w100;
  height: 0.6rem;
  top: 0;
  left: 0;
  padding-top: 0.05rem;
  padding-left: 0.1rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: rgba(237, 129, 78, 0.7);
  & > p {
    @extend .fm_pf;
    font-size: 0.16rem;
  }
}

.thumbs_item_bot {
  @extend .pa;
  right: 5px;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 1px solid $likeBor;
  border-radius: 5px;
  background: $white;
  & > img {
    width: 70%;
    height: auto;
  }
}

.thumbs_bottom {
  @extend .pa;
  @extend .w100;
  bottom: 0;
  left: 50%;
  z-index: 15;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  & > button {
    @extend .pr;
    z-index: 10;
    width: 3.05rem;
    height: 0.8rem;
    background: url('../../assets/img/main/result_close.png') 0 0/100% 100% no-repeat;
    font-size: 0.30rem;
    color: #b26c3c;
  }
}

.bot_mask {
  @extend .pa;
  @extend .w100;
  bottom: 0;
  left: 0;
  z-index: 9;
  height: 1.3rem;
  background: rgba(252, 237, 225, 0.5);
  background: linear-gradient(to bottom, rgba(252, 237, 225, 0) 0%,rgba(252, 237, 225, 0.8) 40%, rgba(252, 237, 225, 1)  80%);;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>