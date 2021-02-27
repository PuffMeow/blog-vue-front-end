<template>
  <div class="link d-flex">
    <router-link active-class="active" class="to-index" exact tag="div" to="/blog">技术</router-link>
    <router-link active-class="active" class="to-index" exact tag="div" to="/img">图说</router-link>
    <router-link active-class="active" class="to-index" exact tag="div" to="/music">乐听</router-link>
    <router-link active-class="active" class="to-index" exact tag="div" to="/messageBoard">留言</router-link>
  </div>
</template>

<script>
import '../style.scss'
export default {}
</script>

<style lang="scss" scoped>
.link {
  justify-content: flex-end;
  margin-right: 30px;
  color: #c1866a;
  .to-index {
    font-size: 18px;
    margin: 20px 20px 0;
    cursor: pointer;
    &:hover {
      animation: bounce1 0.5s ease-out infinite alternate;
      color: #c53a3a;
      text-decoration: underline;
    }
    @keyframes bounce1 {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-5px);
      }
    }
  }
  .active {
    font-size: 22px;
    color: #c53a3a;
    animation: bounce2 0.5s ease-out infinite alternate;
  }
  @keyframes bounce2 {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
}

@media screen and (max-width: 596px) {
  .content {
    .to-index {
      margin: 1.25rem 0.9375rem 0;
    }
    .link {
      justify-content: center;
      margin-right: 0;
    }
  }
}
</style>
