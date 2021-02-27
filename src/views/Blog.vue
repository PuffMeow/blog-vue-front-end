<template>
  <div class="blog">
    <navigator />

    <div v-if="leftBlog.length != 0 || rightBlog.length != 0">
      <div class="outer-box text-center d-flex">
        <div class="left-box">
          <router-link
            :key="index"
            :to="`/blogDetail/${item._id}`"
            class="blog-item bgc-white"
            tag="div"
            v-for="(item, index) in leftBlog"
          >
            <img :src="item.cover" alt="item.cover" class="w-100" />
            <div class="title font-weight">{{ item.title }}</div>
            <div class="pub-time">{{ item.createdAt | dateFormat }}</div>
            <!-- <div class="visited">浏览数:{{ item.visitNum }}</div> -->
          </router-link>
        </div>

        <div class="right-box">
          <router-link
            :key="index"
            :to="`/blogDetail/${item._id}`"
            class="blog-item bgc-white"
            tag="div"
            v-for="(item, index) in rightBlog"
          >
            <img :src="item.cover" alt="item.cover" class="w-100" />
            <div class="title font-weight">{{ item.title }}</div>
            <div class="pub-time">{{ item.createdAt | dateFormat }}</div>
            <!-- <div class="visited">浏览数:{{ item.visitNum }}</div> -->
          </router-link>
        </div>
      </div>

      <loading v-if="leftBlog.length + rightBlog.length !== totle" />
      <div class="no-more mg-auto text-center" v-else>看官，没有更多啦~</div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script>
import '../style.scss'
import loading from '../components/loading'
import throttle from '../utils/throttle.js'
import checkScroll from '../utils/checkScroll'
import navigator from '../components/navigator'

import { getBlogs, getTotal } from '@/service/api'

export default {
  name: 'Blog',
  components: {
    loading,
    navigator,
  },
  data() {
    return {
      leftBlog: [],
      rightBlog: [],
      page: 1,
      pageSize: 6,
      totle: 0,
      isLoading: false,
      afterThrottle: throttle(checkScroll(this.getMoreData), 120),
    }
  },
  methods: {
    async fetch(pageSize, page) {
      const res = await getBlogs(pageSize, page)
      // console.log(res);
      res.data.forEach((ele, i) => {
        if (this.leftBlog.length > this.rightBlog.length) {
          this.rightBlog.push(ele)
        } else {
          this.leftBlog.push(ele)
        }
      })
    },

    async getMoreData() {
      if (this.isLoading === true) {
        return
      }
      if (this.leftBlog.length + this.rightBlog.length === this.totle) {
        // console.log("所有数据加载完毕");
        return
      }
      // console.log("加载数据中");
      this.isLoading = true
      this.page += 1
      await this.fetch(this.pageSize, this.page)
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
  },

  async created() {
    this.fetch(this.pageSize, this.page)
    let totleRes = await getTotal()
    this.totle = totleRes.data
  },

  activated() {
    window.addEventListener('scroll', this.afterThrottle)
  },
  deactivated() {
    window.removeEventListener('scroll', this.afterThrottle)
  },
}
</script>

<style lang="scss" scoped>
$main-color: #c1866a;
.blog {
  .no-more {
    width: 150px;
    margin-bottom: 50px;
    font-style: italic;
    font-size: 13px;
    color: #666;
  }
}
.outer-box {
  margin: 80px auto 0;
  margin-bottom: 120px;
  width: 640px;
  .left-box {
    width: 280px;
  }
  .right-box {
    width: 280px;
    margin-top: 80px;
    margin-left: 80px;
  }

  .blog-item {
    border-radius: 15px;
    position: relative;
    width: 100%;
    border: 1px solid #999;
    height: auto;
    margin-bottom: 20px;
    img {
      height: 250px !important;
    }

    &:hover {
      animation: up 0.5s ease-in-out alternate infinite;
      -webkit-animation: up 0.5s ease-in-out 2 alternate infinite;
      cursor: pointer;
      @keyframes up {
        0% {
          transform: translateY(0);
        }

        100% {
          transform: translateY(-10px);
        }
      }
    }
    img {
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      height: auto;
    }
    .title {
      padding: 5px 10px 20px;
      color: $main-color;
    }
    // .visited,
    .pub-time {
      color: $main-color;
      // position: absolute;
      // bottom: 5px;
      margin-bottom: 5px;
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 600px) {
  .blog {
    .outer-box {
      width: 100%;
      .blog-item {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        img {
          height: 11rem !important;
        }
        .title {
          padding: 0.125rem 0.3125rem 0.75rem;
        }
      }
      .right-box {
        margin-left: 1rem;
      }
    }
  }
}
</style>
