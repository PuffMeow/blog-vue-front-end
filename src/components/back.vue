<template>
  <div @click="$router.go(-1)" class="back">
    <i class="el-icon-caret-left font-weight italic pointer">返回</i>
  </div>
</template>

<script>
import '../style.scss'
export default {}
</script>

<style lang="scss">
.back {
  transition: all 0.5s;
  position: absolute;
  top: -30px;
  left: -1px;
  font-size: 16px;
  color: #d3a145;
  &:hover {
    transform: scale(1.08);
  }
}
</style>
