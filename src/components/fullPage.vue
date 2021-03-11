<template>
  <div>
    <div @click="screenfull" class="full-page pointer">
      <img alt="全屏" src="../assets/img/fullpage.png" />
    </div>
    <div @click="hideTip" class="tip" v-if="isShow">
      全屏浏览
      <br />爽到飞起
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data() {
    return {
      isFullscreen: false,
      isShow: JSON.parse(
        localStorage.fullTipStatus ? localStorage.fullTipStatus : true
      ),
    }
  },
  methods: {
    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'Your browser does not work',
          type: 'warning',
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = true
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    hideTip() {
      localStorage.fullTipStatus = false
      this.isShow = false
    },
  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false
      }
    }
  },
}
</script>

<style lang="scss">
.full-page {
  position: fixed;
  left: 25px;
  top: 15px;
  transition: all 0.5s;
  img {
    width: 30px;
    height: 30px;
  }
  &:hover {
    transform: scale(1.2);
  }
}
.tip {
  position: fixed;
  top: 60px;
  left: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #c68f76;
  width: 60px;
  height: 42px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  animation: move 0.8s linear infinite alternate;
  &.tip:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 18px;
    width: 0;
    height: 0;
    margin-bottom: -2px;
    border: 10px solid transparent;
    border-bottom-width: 14px;
    border-bottom-color: currentColor;
    color: #fff;
  }

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(5px);
    }
  }
}
</style>