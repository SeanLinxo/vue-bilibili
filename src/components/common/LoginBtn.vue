<template>
  <div class="btnparent" @click="registerClick">
    <div class="loginbtn">{{ btntext }}</div>
  </div>
</template>

<script>
export default {
  props: ["btntext"],
  methods: {
    registerClick() {
      this.$emit("registerSubmit");
    },
  },
};
</script>

<style lang="less" scoped>
.btnparent {
  margin: 4vw 2.667vw;
}
.loginbtn {
  height: 12vw;
  background-color: #ff9dbc;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.267vw;
  border-radius: 6vw;
}
</style>
