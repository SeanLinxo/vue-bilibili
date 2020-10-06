<template>
  <div class="loginTop">
    <div></div>
    <div>{{ middleTop }}</div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["middleTop"],
};
</script>

<style lang="less" scoped>
.loginTop {
  height: 12vw;
  background-color: #fff;
  display: flex;
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 4.267vw;
  }
}
</style>
