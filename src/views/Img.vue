<template>
  <div>
    <navigator />
    <div class="container">
      <div
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="10"
        v-infinite-scroll="loadMore"
      >
        <div class="img-list" v-if="imgList.length !== 0">
          <div
            :key="index"
            class="item bgc-white"
            v-for="(item, index) in imgList"
          >
            <div class="content d-flex flex-row">
              <img :src="item.cover" alt />
              <div class="title">{{ item.title }}</div>
            </div>
            <router-link :to="`/imgDetail/${item._id}`">
              <button class="btn color-white pointer">阅读更多&gt;&gt;</button>
            </router-link>
            <div class="line"></div>
            <div class="time bgc-white text-center">
              {{ item.createdAt | dateFormat }}
            </div>
          </div>
        </div>
        <div v-else>
          <loading />
        </div>
      </div>
      <div
        class="no-more mg-auto text-center"
        v-if="imgList.length != 0 && imgList.length == total"
      >
        看官，没有更多啦~
      </div>
    </div>
  </div>
</template>

<script>
import '../style.scss'
import navigator from '../components/navigator'
import loading from '../components/loading'

import { getImgPage, getImgNum } from '@/service/api'

export default {
  components: {
    navigator,
    loading,
  },
  data() {
    return {
      imgList: [],
      isLoading: false,
      total: 0,
      pageSize: 3,
      page: 1,
    }
  },

  async created() {
    await this.getImgPage(this.pageSize, this.page)
    await this.getImgNum()
  },

  methods: {
    async loadMore() {
      if (this.imgList.length === this.total) {
        return
      }
      this.isLoading = true
      this.page++
      await this.getImgPage(this.pageSize, this.page)
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },

    async getImgPage(pageSize, page) {
      const res = await getImgPage(pageSize, page)
      res.data.forEach((ele) => {
        this.imgList.push(ele)
      })
      // console.log(res)
    },

    //获取总数
    async getImgNum() {
      const res = await getImgNum()
      this.total = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.img-list {
  position: relative;
  width: 640px;
  height: auto;
  margin: 80px auto;
  .item {
    position: relative;
    width: 600px;
    height: 220px;
    margin-bottom: 30px;
    border-radius: 10px;
    .btn {
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 100px;
      height: 30px;
      background-color: #c68f76;
      border-radius: 5px;
      z-index: 999;
      &:hover {
        animation: animate 0.5s ease-out alternate infinite;
      }
      @keyframes animate {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-3px);
        }
      }
    }
    .content {
      position: absolute;
      height: 180px;
      width: 560px;
      left: 20px;
      top: 20px;
      img {
        width: 260px;
        height: 180px;
      }
      .title {
        width: calc(560px - 280px);
        text-indent: 2em;
        padding: 0 15px;
        height: 106px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #c68f76;
      }
    }
    &.item::before {
      content: '';
      position: absolute;
      right: -20px;
      top: 15px;
      width: 20px;
      height: 14px;
      border: 0 solid transparent;
      border-bottom: 15px solid currentColor;
      border-radius: 0 0 25px 0;
      color: #f8f9f4;
    }
    .line {
      position: absolute;
      right: -40px;
      height: 250px;
      width: 2px;
      background-color: #000;
      &.line::after {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        top: 15px;
        left: -6px;
        border-radius: 50%;
        background-color: #c68f76;
      }
    }

    .time {
      position: absolute;
      right: -230px;
      top: 22px;
      width: 160px;
      height: 30px;
      line-height: 30px;
      border-radius: 3px 30px 3px 30px;
      font-size: 14px;
      color: #c68f76;
    }
  }
}

.no-more {
  width: 150px;
  margin-bottom: 50px;
  font-style: italic;
  font-size: 13px;
  color: #666;
}

@media screen and (max-width: 596px) {
  .container {
    width: 100%;
    .img-list {
      width: 100%;
      img {
        width: 11.25rem !important;
        height: 6.25rem !important;
        padding-left: 0.8rem;
      }
      .item {
        width: 92%;
        margin: 0 auto;
        height: 12.5rem;
        margin-bottom: 1rem;
        .content {
          width: 100%;
          left: 0;
          .title {
            width: calc(25rem - 11.25rem);
            overflow: auto;
            -webkit-line-clamp: 999;
          }
          ::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }
          -ms-overflow-style: none; /* IE 10+ */
          scrollbar-width: none; /* Firefox */
        }
        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 0;
          height: 0;
          border: 0 solid transparent;
          border-bottom: 0 solid currentColor;
          border-radius: 0;
          color: #f8f9f4;
        }
      }
    }
    .line {
      display: none;
    }
    .time {
      left: 1rem;
      top: 9.5rem !important;
    }
  }
}
</style>
