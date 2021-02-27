<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <backToTop />
    <player v-show="$store.state.isShowPlayer" />
  </div>
</template>

<script>
import backToTop from './components/backToTop'
import player from './components/music.vue'

export default {
  name: 'app',
  components: {
    backToTop,
    player,
  },

  mounted() {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        document.title = '球球您别走,再看两眼嘛~'
      } else {
        document.title = '欢迎回来哟~'
        setTimeout(() => {
          document.title = '这里是云游空间~'
        }, 1500)
      }
    })
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #eae3d5;
}
canvas {
  background: rgb(226, 225, 225);
  opacity: 0.3;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #999;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
