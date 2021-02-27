<template>
  <div class="navigation">
    <div class="status">
      <div class="content">
        <img alt="Yu-You Logo" class="logo circle border" src="../assets/img/yunyou.png" />
        <navigator class="d-flex jc-center ai-center navigator" />
      </div>
    </div>
    <div class="footer">
      <div class="code">桂 ICP备20004368号-1</div>
      <div class="name">Yu-You图片空间</div>
    </div>
  </div>
</template>

<script>
import '../style.scss'
import navigator from '../components/navigator'
export default {
  name: 'Navigation',
  components: {
    navigator,
  },
}
</script>

<style lang="scss" scoped>
$main-color: #c1866a;
.content {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  animation: move 1s ease-in;
  .logo {
    display: block;
    width: 250px;
    height: 250px;
    margin: 0 40px;
    animation: rotate 30s linear infinite;
  }
  @keyframes move {
    0% {
      opacity: 0;
      top: 30px;
    }
    100% {
      opacity: 1;
      top: 150px;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.footer {
  color: $main-color;
  text-align: center;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  .name {
    font-size: 13px;
  }
}
</style>
