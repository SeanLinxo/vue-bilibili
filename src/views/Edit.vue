<template>
  <div class="editViews">
    <div style="margin-bottom: 2.667vw">
      <nav-bar :imgSrc="model.user_img" @infoPage="$router.push('/userinfo')" />
    </div>
    <div class="upload-file">
      <van-uploader
        class="upload-img"
        preview-size="100vw"
        :after-read="afterRead"
      />
      <edit-banner left="头像">
        <img :src="model.user_img" slot="right" v-if="model.user_img" />
        <img src="../assets/defaultImg.jpg" slot="right" v-else />
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{
        model.gender ? model.gender : "男"
      }}</a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="textshow = true"> </edit-banner>

    <!-- 修改昵称弹出框 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" placeholder="请输入1~10个字符" autofocus />
    </van-dialog>
    <!-- 修改性别弹出框 -->
    <van-dialog
      v-model="gendershow"
      title="性别"
      show-cancel-button
      @confirm="selectClick"
      @cancel="gender = '1'"
    >
      <van-radio-group
        v-model="gender"
        direction="horizontal"
        class="radio-group"
      >
        <van-radio name="男" class="radio">男</van-radio>
        <van-radio name="女" class="radio">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <!-- 修改个性签名弹出框 -->
    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textareaClick"
      @cancel="content = ''"
    >
      <van-field
        v-model="content"
        placeholder="活出个性！"
        type="textarea"
        maxlength="16"
        autofocus="autofocus"
      />
    </van-dialog>
    <!-- 返回个人中心 -->
    <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>
    <!-- 退出登录 -->
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
import EditBanner from "../components/common/EditBanner.vue";

export default {
  data() {
    return {
      model: {},
      show: false,
      content: "",
      gender: "男",
      gendershow: false,
      textshow: false,
    };
  },
  components: {
    NavBar,
    EditBanner,
  },
  created() {
    this.userInfoData();
  },
  methods: {
    // 请求用户数据
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    //图片处理
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpdate();
    },
    //用户数据更新方法
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.success("修改成功");
      }
    },
    //昵称确认提交
    confirmClick() {
      // 正则检查修改内容
      let rulg = /^.{1,10}$/;
      if (!rulg.test(this.content)) {
        this.$msg.fail("输入范围限制1~10个字符");
        this.content = "";
        return;
      }
      this.model.name = this.content;
      this.UserUpdate();
      this.content = "";
    },
    //性别确认提交
    selectClick() {
      this.model.gender = this.gender;
      this.UserUpdate();
      this.gender = "男";
    },
    //个性签名确认提交
    textareaClick() {
      this.model.user_desc = this.content;
      this.UserUpdate();
      this.content = "";
    },
    //退出登录
    logout() {
      this.$msg.success("退出成功");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
  },
};
</script>

<style lang='less' scoped>
.editViews a {
  color: #333;
}
.editViews img {
  width: 12.8vw;
  height: 12.8vw;
  border-radius: 50%;
}
.upload-file {
  position: relative;
  overflow: hidden;
  .upload-img {
    position: absolute;
    opacity: 0;
  }
}
.radio-group {
  margin: 8vw 0;
  display: flex;
  .radio {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
}
.editback {
  margin-top: 5.556vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fb7299;
  padding: 4.167vw 0;
  font-size: 4vw;
}
.logout {
  margin-top: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fb7299;
  padding: 4.167vw 0;
  font-size: 4vw;
  border-top: 0.133vw solid #f4f4f4;
}
</style>