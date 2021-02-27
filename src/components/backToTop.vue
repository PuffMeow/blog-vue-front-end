<template>
  <transition name="slide-fade">
    <div @click="getTop" class="page-component-up" v-show="isShow">
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>
<script>
import throttle from '../utils/throttle'
export default {
  name: 'BackToTop',
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    showIcon() {
      if (
        document.documentElement.scrollTop > 200 ||
        document.body.scrollTop > 200
      ) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    getTop() {
      ;(function scrollToTop() {
        let currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(scrollToTop)
          window.scrollTo(0, currentScroll - currentScroll / 5)
        }
      })()
    },
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.showIcon, 30))
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.3, 0.8, 1);
  opacity: 0;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.page-component-up {
  background-color: #bba478;
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0.3;
  transition: 0.3s;
  text-align: center;
  z-index: 9999;
}
.el-icon-caret-top {
  font-size: 36px;
  margin-top: 7px;
  color: #ffffff;
  text-align: center;
  z-index: 99999;
}
.hover {
  background-color: #ca9025;
}

@media screen and (max-width: 596px) {
  .page-component-up {
    width: 2.8rem;
    height: 2.8rem;
    right: 2rem;
    bottom: 2rem;
  }
  .el-icon-caret-top {
    margin-top: 0.125rem;
  }
}
</style>
