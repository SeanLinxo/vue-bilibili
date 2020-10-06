<template>
  <div class="back-top-box" v-if="isShow" @click="backTop">
    <div>顶部</div>
  </div>
</template>

<script>
export default {
  props: ["distance"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    handelEvent(e) {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (sTop >= this.distance && !this.isShow) {
        this.isShow = true;
      } else if (sTop < this.distance && this.isShow) {
        this.isShow = false;
      }
    },
    backTop() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    window.addEventListener("scroll", this.handelEvent);
  },
};
</script>

<style lang="less">
.back-top-box {
  position: fixed;
  right: 4.167vw;
  bottom: 22.222vw;
  border-radius: 50%;
  background: #fff;
  border: 0.133vw solid #f87299;
  div {
    width: 9.6vw;
    height: 9.6vw;
    color: #f87299;
    line-height: 9.6vw;
    text-align: center;
    font-size: 3.733vw;
  }
}
</style>