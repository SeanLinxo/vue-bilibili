<template>
  <div class="editBanner" @click="bannerClick">
    <span>{{ left }}</span>
    <span><slot name="right" /></span>
  </div>
</template>

<script>
export default {
  props: ["left"],
  methods: {
    bannerClick() {
      this.$emit("bannerClick");
    },
  },
};
</script>

<style lang='less' scoped>
.editBanner {
  padding: 4vw 2.667vw;
  background-color: #fff;
  border-bottom: 0.267vw solid #f4f4f4;
  color: #929292;
  font-size: 3.733vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>