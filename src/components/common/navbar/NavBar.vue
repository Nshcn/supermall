<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  /*当存在内容时，只需设置line-height即可，无需设置height*/
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left, .right {
  width: 60px;
}

.center {
  /*由于left,right已经设置了宽度，center会占据剩余的所有宽度*/
  flex: 1;
}
</style>
