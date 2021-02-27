<template>
  <div>
    <el-drawer
      :append-to-body="true"
      :modal="false"
      :visible.sync="isShow"
      direction="btt"
      size="35%"
    >
      <el-form label-width="80px">
        <el-form-item label="昵称" style="width: 90%">
          <el-input
            clearable
            max="10"
            maxlength="10"
            placeholder="请输入您的昵称"
            show-word-limit
            v-model="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" style="width: 90%">
          <el-input
            clearable
            max="100"
            maxlength="100"
            placeholder="请输入评论内容"
            show-word-limit
            v-model="content"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 10%">
          <div
            @click="send1"
            class="send-btn pointer text-center"
            v-if="to === ''"
          >
            发送
          </div>
          <div @click="send2" class="send-btn pointer text-center" v-else>
            发送
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import getRandomAvatar from '../utils/getRandomAvatar'
import { message } from '../utils/utils.js'

import { send1Comment, send2Comment } from '@/service/api'
export default {
  data() {
    return {
      id: '', //如果是send1则是文章的id，如果是send2则是一级评论对象的id
      isShow: false,
      username: localStorage.username ? localStorage.username : '',
      avatar: getRandomAvatar(),
      to: '', //回复的对象
      content: '',
    }
  },
  methods: {
    //send1(一级评论)里的id对应的是文章的id，send2(二级评论)里的id对应的是一级评论的id
    showCommentDrawer(username, id) {
      this.to = username
      this.id = id
      // console.log(username, id)
      this.isShow = true
      this.username = localStorage.blogUsername ? localStorage.blogUsername : ''
    },
    //发送一级评论
    async send1() {
      const flag = this.checkInput()
      if (flag === false) {
        return
      }
      const comment = {
        object: this.id,
        username: this.username,
        avatar: this.avatar,
        comment: this.content,
      }
      const res = await send1Comment(comment)
      localStorage.blogUsername = this.username
      this.closeDrawer()
      this.callAfterSendComment()
      message('success', '评论成功')
    },
    //发送二级评论
    async send2() {
      const flag = this.checkInput()
      if (flag === false) {
        return
      }

      const comment = {
        username: this.username,
        avatar: this.avatar,
        to: this.to,
        comment: this.content,
      }
      const res = await send2Comment(this.id, comment)
      localStorage.blogUsername = this.username
      // console.log(res)
      this.closeDrawer()
      this.callAfterSendComment()
      message('success', '评论成功')
    },
    closeDrawer() {
      this.username = ''
      this.content = ''
      this.isShow = false
    },
    //检查输入框是否为空
    checkInput() {
      if (this.username === '') {
        message('warning', '请输入您的昵称')
        return false
      }
      if (this.content === '') {
        message('warning', '请输入评论内容')
        return false
      }
    },
    callAfterSendComment() {
      this.$emit('callAfterSendComment')
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer.btt {
  width: 30%;
  margin: 0 auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #f8f9f4;
}
.send-btn {
  background-color: #c1866a;
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-radius: 5px;
}

::v-deep .el-input__inner {
  padding-right: 82px !important;
  &:focus {
    border-color: #c1866a;
  }
}
::v-deep .el-drawer {
  border: none;
  outline: none;
}
::v-deep .el-message {
  background-color: #c1866a;
  border: none;
  .el-message__content {
    color: #fff;
  }
  .el-icon-info {
    color: #fff;
  }
}
</style>
