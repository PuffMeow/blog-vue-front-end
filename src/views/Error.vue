<template>
  <div>
    <navigator class="d-flex" />
    <h2 class="not-find d-flex">该页面不存在</h2>
  </div>
</template>

<script>
import navigator from '../components/navigator'
export default {
  components: {
    navigator,
  },
}
</script>

<style>
.not-find {
  color: #c1866a;
  margin-top: 250px;
  justify-content: center;
  align-items: center;
}
</style>