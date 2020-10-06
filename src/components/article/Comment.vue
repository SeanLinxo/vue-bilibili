<template>
  <div class="comment">
    <van-loading size="10vw" v-if="!commentList" color="#f87299"
      >加载中...</van-loading
    >
    <div v-if="commentList && commentList.length == 0">
      <img style="width: 100%" src="@/assets/notFound.png" />
    </div>
    <div class="item" v-for="(item, index) in commentList" :key="index" v-else>
      <div class="commentitem">
        <div class="userimg">
          <img
            :src="item.userinfo.user_img"
            v-if="item.userinfo && item.userinfo.user_img"
          />
          <img src="@/assets/defaultImg.jpg" v-else />
        </div>
        <div class="detail">
          <p>
            <span class="username" v-if="item.userinfo">{{
              item.userinfo.name
            }}</span>
            <span class="username" v-else>神秘人</span>
            <span class="time" v-if="item.comment_date">{{
              item.comment_date
            }}</span>
            <span class="time" v-else>神秘时间</span>
          </p>
          <div class="content" v-if="item.comment_content">
            {{ item.comment_content }}
            <span class="pusblishReply" @click="publishClick(item.comment_id)"
              >+回复</span
            >
          </div>
          <div class="content" v-else>
            该用户什么都没留下
            <span class="pusblishReply" @click="publishClick(item.comment_id)"
              >+回复</span
            >
          </div>
        </div>
      </div>
      <reply
        @publishReplyComment="publishClick"
        :commentChildren="item.children"
      ></reply>
    </div>
  </div>
</template>

<script>
import Reply from "./Reply.vue";

export default {
  data() {
    return {
      commentList: null,
    };
  },
  components: {
    Reply,
  },
  created() {
    this.commentData();
  },
  methods: {
    // 递归改造评论数据
    changeComentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].children = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    // 请求评论数据
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      setTimeout(() => {
        this.commentList = this.changeComentData(res.data);
      }, 500);
    },
    //点击回复按钮，聚焦输入框
    publishClick(id) {
      this.$emit("publishClick", id);
    },
  },
};
</script>

<style lang="less" >
.van-loading {
  text-align: center;
  height: 100vh;
}
.commentitem {
  display: flex;
  background-color: #fff;
  padding: 3.2vw;
  position: relative;
  .userimg {
    margin-left: 2.667vw;
    img {
      width: 9.6vw;
      height: 9.6vw;
      border-radius: 50%;
    }
  }
  .detail {
    margin-left: 4vw;
    p {
      display: flex;
      font-size: 3.733vw;
      flex-flow: column;
      margin: 0;
      .username {
        color: #757575;
        margin-bottom: 1.333vw;
      }
      .time {
        color: #999;
        font-size: 3.2vw;
      }
    }
    .content {
      margin-top: 2.4vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
      .pusblishReply {
        position: absolute;
        right: 3.867vw;
        top: 7.222vw;
        color: #f87299;
        font-size: 3.333vw;
      }
    }
  }
}
</style>