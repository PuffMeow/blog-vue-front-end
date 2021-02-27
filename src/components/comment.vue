<template>
  <div class="comment-box">
    <div class="header">
      留言数：
      <span style="color: #d3a145">{{ total }}</span>
      <button @click="showDrawer('', id)" class="comment-btn pointer">
        发表评论
      </button>
    </div>
    <div class="dash-line"></div>
    <div :key="index" class="content" v-for="(rep1, index) in comments">
      <div class="detail d-flex flex-row">
        <div class="avatar">
          <img :alt="rep1.username" :src="rep1.avatar" />
        </div>
        <div class="name">{{ rep1.username }}</div>
        <div class="time">{{ rep1.createdAt | dateFormat }}</div>
        <div @click="showDrawer(rep1.username, rep1._id)" class="reply pointer">
          回复
        </div>
      </div>
      <div class="comment">{{ rep1.comment }}</div>
      <div
        :key="index"
        class="second-reply"
        v-for="(rep2, index) in rep1.items"
      >
        <div class="detail d-flex flex-row">
          <div class="avatar">
            <img :alt="rep2.username" :src="rep2.avatar" />
          </div>
          <div class="name">
            {{ rep2.username }}
            <span style="font-size: 11px">回复</span>
            {{ rep2.to }}
          </div>
          <div class="time">{{ rep2.createdAt | dateFormat }}</div>
          <div
            @click="showDrawer(rep2.username, rep1._id)"
            class="reply pointer"
          >
            回复
          </div>
        </div>
        <div class="comment">{{ rep2.comment }}</div>
      </div>
      <div class="dash-line"></div>
    </div>
    <commentDrawer
      @callAfterSendComment="afterSendComment"
      ref="commentDrawer"
    />
    <div
      @click="loadMoreComment"
      class="load-more text-center mg-auto pointer"
      v-if="isMore"
    >
      <i class="el-icon-arrow-down">加载更多</i>
    </div>
    <div class="no-more mg-auto" v-else>暂无更多</div>
  </div>
</template>

<script>
import commentDrawer from '../components/commentDrawer'
import { fetchCommentNum, getCommentsPage } from '@/service/api'

export default {
  props: {
    id: { type: String, require: true },
  },
  components: {
    commentDrawer,
  },
  data() {
    return {
      comments: [],
      total: 0, //评论总数
      page: 1,
      pageSize: 5,
      firstCommentCount: 0, //一级评论的数量
      secondCommentCount: 0, //二级评论的数量
      isMore: false,
    }
  },
  methods: {
    // 获取评论的总数量
    async fetchCommentNum() {
      const res = await fetchCommentNum(this.id)
      this.total = res.data
    },

    //获取第一页的评论
    async fetchComments(pageSize, page) {
      const res = await this.commentsPage(this.pageSize, this.page)
      // console.log(res)
      this.comments = res.data
      await this.fetchCommentNum()
      if (this.total > 5) {
        this.isMore = true
      }
    },

    //评论分页获取
    async commentsPage(pageSize, page) {
      return await getCommentsPage(this.id, pageSize, page)
      // return await this.$axios.get(
      //   `/comment/getComments/${this.id}/${pageSize}/${page}`
      // )
    },

    //显示评论输入框
    showDrawer(username, id) {
      //调用子组件触发弹框的方法
      this.$refs.commentDrawer.showCommentDrawer(username, id)
    },

    //发表评论之后重新获取最新评论
    async afterSendComment() {
      let res
      if (this.total === this.comments.length) {
        res = await this.commentsPage(this.id, this.comments.length + 1)
        // res = await this.$axios.get(
        //   `/comment/getComments/${this.id}/${this.comments.length + 1}`
        // )
      } else {
        res = await this.commentsPage(this.id, this.comments.length)
        // res = await this.$axios.get(
        //   `/comment/getComments/${this.id}/${this.comments.length}`
        // )
      }
      this.comments = res.data
      await this.fetchCommentNum()
      this.isShowMore()
    },

    //加载更多评论
    async loadMoreComment() {
      this.page += 1
      const res = await this.commentsPage(this.pageSize, this.page)
      this.comments = this.comments.concat(res.data)
      this.isShowMore()
    },

    //是否显示加载更多按钮
    isShowMore() {
      if (this.total === this.comments.length) {
        this.isMore = false
      } else {
        this.isMore = true
      }
    },
  },

  async mounted() {
    await this.fetchComments(this.pageSize, this.page)
  },
}
</script>

<style lang="scss" scoped>
.comment-box {
  width: 600px;
  height: auto;
  margin: 0 auto 150px;
  .header {
    height: 32px;
    color: #c1866a;
    line-height: 30px;
    .comment-btn {
      width: 100px;
      height: 32px;
      background-color: #c1866a;
      border-radius: 5px;
      color: #fff;
      float: right;
    }
  }
  .content {
    .detail {
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
      .reply {
        font-size: 12px;
        line-height: 25px;
        color: #c5a477;
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
      padding-bottom: 20px;
      font-size: 13px;
      color: #c5a477;
    }
    .second-reply {
      margin-left: 50px;
    }
  }
  .load-more {
    width: 100px;
    height: 38px;
    line-height: 38px;
    margin-top: 80px;
    color: #fff;
    font-size: 13px;
    background-color: #c1866a;
    border-radius: 5px;
  }
  .no-more {
    width: 100px;
    height: 38px;
    line-height: 38px;
    margin-top: 70px;
    color: #c1866a;
    text-align: center;
  }
}

@media screen and (max-width: 596px) {
  .content {
    font-size: 0.8125rem !important;
    .detail {
      .avatar {
        padding-left: 0.2rem;
      }
    }
  }
}
</style>
