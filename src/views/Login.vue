<template>
  <div>
    <!-- 登录头部 -->
    <login-top middleTop="登录bilibili">
      <div
        class="right"
        slot="right"
        @click="push"
        style="font-size: 3.2vw; color: #ff9dbc"
      >
        切换到注册
      </div>
    </login-top>
    <!-- 登录输入框 -->
    <login-text
      label="账号"
      rule="^.{6,15}$"
      placeholder="请输入账号"
      style="margin: 4vw 0"
      @inputChange="(res) => (username = res)"
    ></login-text>
    <login-text
      label="密码"
      type="password"
      rule="^.{6,15}$"
      placeholder="请输入密码"
      @inputChange="(res) => (password = res)"
    ></login-text>
    <!-- 注册按钮 -->
    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from "../components/common/LoginTop";
import LoginText from "../components/common/LoginText";
import LoginBtn from "../components/common/LoginBtn";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  methods: {
    async registerSubmit() {
      if (this.username && this.password) {
        const res = await this.$http.post("/login", {
          username: this.username,
          password: this.password,
        });
        if (res.data.code === 200) {
          this.$msg.success(res.data.msg);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1000);
        } else this.$msg.fail(res.data.msg);
      } else {
        this.$msg.fail("格式不对，请重新输入");
      }
    },
    push() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang='less' scoped>
</style>
