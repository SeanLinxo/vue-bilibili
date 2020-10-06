<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in commentChildren" :key="index">
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
            <span class="userName" v-if="item.userinfo">{{
              item.userinfo.name
            }}</span>
            <span class="userName" v-else>神秘人</span>
            <span class="time" v-if="item.comment_date">{{
              item.comment_date
            }}</span>
            <span class="time" v-else>神秘时间</span>
          </p>
          <div class="content" v-if="item.comment_content">
            <div v-if="replyName">
              回复
              <span style="color: #f87299"
                >@{{ item.parent_user_info.name }}</span
              >：{{ item.comment_content }}
              <span
                class="commentReply"
                @click="commentReplyClick(item.comment_id)"
                >+回复</span
              >
            </div>
            <div v-else>
              {{ item.comment_content }}
              <span
                class="commentReply"
                @click="commentReplyClick(item.comment_id)"
                >+回复</span
              >
            </div>
          </div>
          <div class="content" v-else>
            <div v-if="replyName">
              回复
              <span style="color: #f87299"
                >@{{ item.parent_user_info.name }}</span
              >：该用户什么也没留下
              <span
                class="commentReply"
                @click="commentReplyClick(item.comment_id)"
                >+回复</span
              >
            </div>
            <div v-else>
              该用户什么也没留下
              <span
                class="commentReply"
                @click="commentReplyClick(item.comment_id)"
                >+回复</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="commentchildren">
        <commentChildrenItem
          @replyCommentChild="replyCommentChild"
          :commentChildren="item.children"
          :replyName="true"
        ></commentChildrenItem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentChildrenItem",
  props: ["commentChildren", "replyName"],
  methods: {
    // 传递二级评论id
    commentReplyClick(id) {
      // 传递多级评论给二级评论
      this.$emit("replyCommentChild", id);
      // 传递二级评论id给一级评论
      this.$emit("publishReplyComment", id);
    },
    replyCommentChild(id) {
      // 二级之后的多级评论都调用二级评论传递一级评论的方法
      this.commentReplyClick(id);
      // 传递多级评论id给一级评论
      this.$emit("publishReplyComment", id);
    },
  },
};
</script>

<style lang="less">
.reply {
  padding-left: 10.278vw;
  .commentchildren .reply {
    padding-left: 0;
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
        .commentReply {
          position: absolute;
          right: 3.867vw;
          top: 7.222vw;
          color: #f87299;
          font-size: 3.333vw;
        }
      }
    }
  }
}
</style>