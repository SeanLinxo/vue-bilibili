<template>
  <div class=".userinfo">
    <nav-bar :imgSrc="model.user_img" />
    <div class="backImg"></div>
    <user-detail :userInfo="model" />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
import UserDetail from "../components/userComponent/userDetail.vue";

export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    UserDetail,
  },
  methods: {
    // 请求用户数据
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
  created() {
    this.userInfoData();
  },
};
</script>

<style lang="less">
.backImg {
  width: 100vw;
  height: 24vw;
  background: url("../assets/bannerTopImg.png");
  background-size: cover;
  background-position: 50%;
}
</style>