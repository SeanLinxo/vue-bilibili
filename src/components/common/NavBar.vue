<template>
  <div class="NavBar">
    <div @click="toHome">
      <img src="@/assets/logo.png" />
    </div>
    <div>
      <div><van-icon name="search" class="iconNav" /></div>
    </div>
    <div>
      <img :src="imgSrc" v-if="imgSrc" @click="toUserInfo" />
      <img src="@/assets/defaultImg.jpg" v-else @click="toLogin" />
      <div class="download">下载App</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgSrc"],
  methods: {
    toUserInfo() {
      this.$emit("infoPage");
    },
    toLogin() {
      this.$emit("loginPage");
    },
    toHome() {
      if (!(this.$route.path == "/")) {
        this.$router.push("/");
      }
      return;
    },
  },
};
</script>

<style scoped lang="less">
.NavBar {
  width: 100vw;
  height: 13.056vw;
  display: flex;
  background-color: white;
  div:nth-child(1) {
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.389vw;
    div {
      background-color: #f4f4f4;
      height: 6.667vw;
      width: 100%;
      border-radius: 3.333vw;
      position: relative;
      .iconNav {
        color: #aaa;
        position: absolute;
        left: 2.778vw;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    .download {
      margin: 0 2.778vw;
      font-size: 3.611vw;
      background-color: #fb7299;
      padding: 1.389vw 2.778vw;
      text-align: center;
      border-radius: 0.833vw;
      color: white;
    }
    img {
      width: 6.944vw;
      height: 6.944vw;
      border-radius: 50%;
    }
  }
}
</style>