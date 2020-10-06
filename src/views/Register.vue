<template>
  <div>
    <!-- 注册头部 -->
    <login-top middleTop="注册bilibili">
      <div
        class="right"
        slot="right"
        @click="push"
        style="font-size: 3.2vw; color: #ff9dbc"
      >
        切换到登录
      </div>
    </login-top>
    <!-- 注册输入框 -->
    <login-text
      label="姓名"
      style="margin: 4vw 0"
      rule="^.{6,15}$"
      placeholder="请输入姓名"
      @inputChange="(res) => (name = res)"
    ></login-text>
    <login-text
      label="账号"
      rule="^.{6,15}$"
      placeholder="请输入账号"
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
    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from "../components/common/LoginTop";
import LoginText from "../components/common/LoginText";
import LoginBtn from "../components/common/LoginBtn";

export default {
  data() {
    return {
      name: "",
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
      if (this.name && this.username && this.password) {
        const res = await this.$http.post("/register", {
          name: this.name,
          username: this.username,
          password: this.password,
        });
        if (res.data.code === 200) {
          // 把返回的id的token存储到本地
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.objtoken);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1000);
          //弹出注册成功
          this.$msg.success(res.data.msg);
        } else if (res.data.code === 302) {
          this.$msg.fail(res.data.msg);
        }
      } else {
        this.$msg.fail("格式不对，请重新输入");
      }
    },
    push() {
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
