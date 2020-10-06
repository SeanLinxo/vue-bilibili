<template>
  <div class="article" v-if="model">
    <!-- 搜索栏 -->
    <nav-bar
      :imgSrc="user.user_img"
      @infoPage="$router.push('/userinfo')"
      @loginPage="$router.push('/userinfo')"
    ></nav-bar>
    <!-- 视频详情 -->
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>146.4万次观看</span>
          <span>5281弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p
            @click="collectionClick"
            :class="{ activeColor: collectionActive }"
          >
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p
            @click="subscriptClick"
            :class="{ activeColor: subscritionActive }"
          >
            <span class="icon-bubble"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
    </div>
    <van-tabs
      v-model="active"
      animated
      title-active-color="#f87299"
      color="#f87299"
    >
      <!-- 推荐区 -->
      <van-tab title="相关推荐">
        <div class="detailParent">
          <detail
            class="detailItem"
            v-for="(item, index) in commend"
            :detailItem="item"
            :key="index"
          ></detail>
        </div>
      </van-tab>
      <!-- 评论区 -->
      <van-tab :title="'评论（' + commmentLength + '）'" v-if="commmentLength">
        <comment-title
          :imgSrc="user.user_img"
          @sendComment="sendComment"
          ref="commentFocus"
        ></comment-title>
        <comment @publishClick="publishClick" ref="reload"></comment>
      </van-tab>
      <van-tab title="评论" v-else>
        <comment-title
          :imgSrc="user.user_img"
          @sendComment="sendComment"
          ref="commentFocus"
        ></comment-title>
        <comment @publishClick="publishClick" ref="reload"></comment>
      </van-tab>
    </van-tabs>
    <back-top distance="700"></back-top>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
import Detail from "./Detail.vue";
import CommentTitle from "../components/article/CommentTitle.vue";
import Comment from "../components/article/Comment";
import BackTop from "../components/backTop/BackTop.vue";

export default {
  data() {
    return {
      user: {},
      model: null,
      collectionActive: null,
      subscritionActive: null,
      active: 0,
      commend: null,
      commmentLength: null,
      sendCommentData: {
        comment_content: "",
        comment_date: null,
        parent_id: null,
        article_id: null,
      },
    };
  },
  components: {
    NavBar,
    Detail,
    CommentTitle,
    Comment,
    BackTop,
  },
  methods: {
    //获取文章信息
    async articleitemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        this.subscritionInit();
      }
    },
    //获取用户数据
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.user = res.data[0];
    },
    //收藏文章
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    //点击关注发帖用户
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.subscritionActive = true;
        } else {
          this.subscritionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    //进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        this.collectionActive = res.data.success;
      }
    },
    //进入页面获取是否关注
    async subscritionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid,
            },
          }
        );
        this.subscritionActive = res.data.success;
      }
    },
    //获取推荐列表
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commend = res.data;
    },
    // 请求评论数据
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commmentLength = res.data.length;
    },
    //发送评论
    async sendComment(data) {
      const date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      let nowDate = `${month}-${day}`;
      this.sendCommentData.comment_content = data;
      this.sendCommentData.comment_date = nowDate;
      this.sendCommentData.article_id = this.$route.params.id;
      const sendResult = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.sendCommentData
      );
      // 评论长度加一，不可能一次评论回复多人的而造成评论条数加n
      this.commmentLength += 1;
      // 通过ref链调用子组件请求评论数据的方法，实现无刷新更新数据
      this.$refs.reload.commentData();
      // 重新把parent_id设置为空，不然如果不点击别的回复，继续在输入框输入内容会继续回复刚才的人
      this.sendCommentData.parent_id = null;
      if (sendResult.status == 200) {
        this.$msg.success("评论发表成功！");
      }
    },
    // 接送多级评论id
    publishClick(id) {
      this.sendCommentData.parent_id = id;
      // 通过ref链调用子组件传递聚焦输入框的方法
      this.$refs.commentFocus.focusInput();
    },
  },
  created() {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
    }
    this.articleitemData();
    this.commendData();
    this.collectionInit();
    this.commentData();
  },
  watch: {
    $route() {
      this.articleitemData();
    },
  },
};
</script>

<style lang='less'>
.article {
  background-color: #fff;
  .detailinfo {
    background-color: white;
    .video {
      width: 100%;
      video {
        width: 100%;
      }
    }
  }
  .detailinfoText {
    padding: 4.167vw;
    border-bottom: 0.267vw solid #edeff1;
    div:nth-child(1) {
      span:nth-child(1) {
        padding: 0 2.778vw;
        color: #fb7299;
        background-color: #f4f4f4;
        border-radius: 2.778vw;
      }
    }
    div:nth-child(2) {
      padding: 2.778vw 2.778vw;
      span {
        color: #aaa;
        font-size: 3.333vw;
        margin-right: 2.778vw;
      }
      span:nth-child(1) {
        color: black;
        font-size: 4vw;
        padding-right: 2.778vw;
      }
    }
    div:nth-child(3) {
      padding: 0 2.778vw;
      display: flex;

      p {
        margin-right: 10px;
        display: flex;
        align-items: center;
        color: #757575;
        span:nth-child(1) {
          margin-right: 3px;
          font-size: 21px;
        }
        span:nth-child(2) {
          font-size: 13px;
        }
      }
      .activeColor {
        color: #fb7299;
      }
    }
  }
  .detailParent {
    margin-top: 2.667vw;
    border-top: 1px solid #edeff1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .detailItem {
      margin: 1.389vw 0;
      width: 45vw;
    }
  }
}
</style>