<template>
  <div>
    <navigator class="d-flex" />
    <div class="container">
      <div class="swiper" v-if="aboutData != ''">
        <el-carousel :interval="5000" height="260px" type="card">
          <el-carousel-item
            :key="index"
            v-for="(item, index) in aboutData.swiper"
          >
            <img :src="item.url" @click="showImg(item.url)" alt="item.name" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-else>
        <loading />
      </div>

      <div class="big-swiper" v-show="isShow">
        <img :src="bigImgUrl" alt="item.name" />
      </div>
      <div @click="hideImg" class="mask" v-show="isShow"></div>
      <div class="desc-bar">
        <div class="logo">
          <img alt="云游空间" src="../assets/img/yunyou.png" />
        </div>
        <div class="desc">{{ aboutData.description }}</div>
      </div>
      <div class="msg-borad">
        <h2 class="msg-board-title">留言板：</h2>
        <el-form @submit.native.prevent label-width="70px">
          <el-form-item label="昵称：" style="width: 95%">
            <el-input
              clearable
              max="10"
              maxlength="10"
              placeholder="请输入您的昵称"
              show-word-limit
              v-model="message.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="留言：" style="width: 95%">
            <el-input
              :rows="5"
              clearable
              max="300"
              maxlength="300"
              placeholder="请输入留言内容"
              show-word-limit
              type="textarea"
              v-model="message.message"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 78%">
            <button @click="sendMessage" class="send-btn pointer">发送</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="msg-box">
        <h2 class="msg-board-title msg-board-list-title">
          留言列表({{ total }}条)：
        </h2>
        <div v-if="messageList !== ''">
          <div
            :key="index"
            class="msg-item"
            v-for="(item, index) in messageList"
          >
            <div class="detail d-flex flex-row">
              <div class="avatar">
                <img :src="item.avatar" alt="图" />
              </div>
              <div class="name">{{ item.username }}</div>
              <div class="time">{{ item.createdAt | dateFormat }}</div>
            </div>
            <div class="comment">{{ item.message }}</div>
          </div>
          <div class="no-message" v-if="messageList == ''">暂无更多留言</div>
          <div
            @click="showMore"
            class="load-more text-center mg-auto pointer"
            v-if="isMore"
          >
            <i class="el-icon-arrow-down">加载更多</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigator from '../components/navigator'
import getRandomAvatar from '../utils/getRandomAvatar.js'
import { message } from '../utils/utils.js'
import loading from '../components/loading'

import {
  getAboutDetail,
  getComments,
  sendComment,
  getMessageNum,
} from '@/service/api'

export default {
  components: {
    navigator,
    loading,
  },
  data() {
    return {
      message: {
        avatar: getRandomAvatar(),
        username: localStorage.blogUsername ? localStorage.blogUsername : '',
        message: '',
      },
      aboutData: '',
      messageList: [],
      currentPage: 1,
      pageSize: 10,
      isMore: false,
      total: 0,
      isShow: false,
      bigImgUrl: '',
    }
  },
  mounted() {
    this.getAboutData()
    this.getMessage(this.pageSize, this.currentPage)
    this.getMessageNum()
  },
  methods: {
    //页面上关于网站介绍的内容
    async getAboutData() {
      const res = await getAboutDetail()
      this.aboutData = res.data[0]
    },

    //获取留言
    async getMessage(pageSize, page) {
      const res = await getComments(pageSize, page)
      res.data.forEach((ele) => {
        this.messageList.push(ele)
      })
      // console.log(res);
      // console.log(this.messageList.length);
      this.isShowMore()
    },

    //发送留言
    async sendMessage() {
      localStorage.blogUsername = this.message.username
      if (this.message.message === '' || this.message.username === '') {
        message('warning', '请填写完整信息')
        return
      }
      await sendComment(this.message)
      message('success', '留言成功')
      this.message.message = ''
      this.afterSendMessage()
    },

    //发表留言后重新获取最新留言
    async afterSendMessage() {
      let res
      if (this.total === this.messageList.length) {
        res = await getComments(this.messageList.length + 1, 1)
        // res = await this.$axios.get(
        //   `/comment/getMessages/${this.messageList.length + 1}/1`
        // )
      } else {
        res = await getComments(this.messageList.length, 1)
        // res = await this.$axios.get(
        //   `/comment/getMessages/${this.messageList.length}/1`
        // )
      }
      // console.log(res);
      this.messageList = res.data
      this.isShowMore()
      this.getMessageNum()
    },

    //获取留言总数
    async getMessageNum() {
      const res = await getMessageNum()
      this.total = res.data
      this.isShowMore()
    },

    //点击加载更多留言
    async showMore() {
      this.currentPage++
      await this.getMessage(this.pageSize, this.currentPage)
    },

    //是否显示加载更多按钮
    isShowMore() {
      if (this.total === this.messageList.length) {
        this.isMore = false
      } else {
        this.isMore = true
      }
    },
    showImg(url) {
      this.bigImgUrl = url
      this.isShow = true
    },
    hideImg() {
      this.isShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
$main-color: #c1866a;
.container {
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid $main-color;
  width: 860px;
  margin: 20px auto 50px;
  padding-bottom: 50px;
  .swiper {
    height: 250px;
  }
  .big-swiper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    img {
      width: 650px;
      height: 500px;
      border-radius: 20px;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 980;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .desc-bar {
    display: flex;
    flex-direction: row;
    .logo {
      height: 250px;
      img {
        display: inline-block;
        margin-top: 10px;
        width: 250px;
        height: 230px;
      }
    }
    .desc {
      margin: 10px 0;
      background: #fff;
      padding: 10px 10px 5px 10px;
      display: inline-block;
      width: 610px;
      color: $main-color;
      font-size: 18px;
      line-height: 34px;
      overflow: auto;
    }
  }
  .msg-board-title {
    font-size: 20px;
    color: $main-color;
    padding-left: 10px;
  }
  .msg-board-list-title {
    border-top: 1px solid $main-color;
    padding-top: 15px;
  }
  .msg-borad {
    .el-form {
      margin-top: 20px;
      .send-btn {
        width: 4.25rem;
        height: 35px;
        background-color: $main-color;
        color: #fff;
        border-radius: 5px;
      }
    }
    ::v-deep .el-form-item__label {
      color: $main-color;
    }
  }
}

.msg-box {
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  .no-message {
    position: absolute;
    transform: translateX(-50%);
    top: 50px;
    left: 50%;
    color: $main-color;
  }
  .load-more {
    width: 100px;
    height: 38px;
    line-height: 38px;
    margin-top: 10px;
    color: #fff;
    font-size: 13px;
    background-color: #c1866a;
    border-radius: 5px;
  }
  .msg-item {
    margin: 10px 20px 10px;
    .detail {
      .avatar img {
        border: 1px solid #ccc;
        border-radius: 50%;
      }
      .name,
      .time,
      .reply {
        margin: 20px 2px 0 10px;
      }
      .name {
        color: #c1866a;
      }
      .time {
        color: #999;
        font-size: 13px;
        line-height: 25px;
      }
      img {
        margin-top: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .comment {
      margin-left: 50px;
      padding-bottom: 10px;
      font-size: 15px;
      color: #c5a477;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
  border: 1px solid #ccc;
}

::v-deep .el-carousel__indicator--horizontal {
  display: none !important;
}

::v-deep .el-input__inner,
::v-deep .el-textarea__inner {
  padding-right: 82px !important;
  &:focus {
    border-color: $main-color;
  }
}

//移动端适配
@media screen and (max-width: 596px) {
  ::v-deep .container {
    overflow: hidden;
    margin-top: 3.125rem;
    font-size: 1rem;
    width: 100% !important;
    .swiper {
      height: 9.375rem;
    }
    .el-carousel__container {
      height: 9.375rem !important;
    }
    .el-carousel__arrow {
      top: 50%;
    }

    .big-swiper {
      position: fixed;
      z-index: 999;
      img {
        width: 25rem;
        height: 18.75rem;
      }
    }

    .el-carousel__item {
      height: 100% !important;
      border-radius: 0.3125rem;
    }

    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-carousel__item img {
      height: 100%;
    }
    .el-carousel__item--card {
      width: 50%;
      height: 70%;
    }
    .desc-bar {
      .logo {
        height: 11.25rem;
      }
      .logo img {
        margin-top: 0;
        width: 11.25rem;
        height: 11.25rem;
      }
      .desc {
        font-size: 0.875rem;
        line-height: 1.5625rem;
        margin: 0;
        padding: 0.1rem;
      }
    }

    .msg-board-title {
      font-size: 1.25rem;
    }
    .msg-item {
      margin: 0.3125rem 0.625rem 0.3125rem;
      .detail {
        .avatar img {
          border: 1px solid #ccc;
          border-radius: 50%;
        }
        .name,
        .time,
        .reply {
          margin: 1.25rem 0.125rem 0 0.625rem;
        }
        .name {
          color: #c1866a;
        }
        .time {
          color: #999;
          font-size: 0.75rem;
          line-height: 1.5625rem;
        }
        img {
          margin-top: 0.625rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
      }

      .comment {
        margin-left: 3rem;
        padding-bottom: 0.625rem;
        font-size: 0.875rem;
        color: #c5a477;
      }
    }
  }
  ::v-deep .el-form-item {
    width: 100% !important;
  }
}
</style>
