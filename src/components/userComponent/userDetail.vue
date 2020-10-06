<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img" v-if="userInfo.user_img" />
        <img src="@/assets/defaultImg.jpg" v-else />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="username">{{ userInfo.name }}</h2>
      <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
};
</script>

<style lang='less'>
.userdetail {
  background-color: #fff;
  > div:nth-child(1) {
    display: flex;
    .user_img {
      margin-left: 2.667vw;
      margin-right: 10vw;
      img {
        width: 22.667vw;
        height: 22.667vw;
        border-radius: 50%;
        border: 1px solid #f2f2f2;
        margin-top: -1.6vw;
      }
    }
    .user_edit {
      flex: 1;
      div:nth-child(1) {
        display: flex;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.611vw;
          .user_text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 0.278vw solid #ccc;
        }
      }
      div:nth-child(2) {
        padding: 0.556vw 2.778vw;
        .user_editBtn {
          border: 0.533vw solid #fb7a9f;
          padding: 0.833vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fb7a9f;
          font-size: 3.73333vw;
          border-radius: 1.111vw;
        }
      }
    }
  }
  > div:nth-child(2) {
    padding-left: 3.2vw;
    .username {
      margin: 0;
      font-weight: 400;
      font-size: 4.8vw;
    }
    p {
      margin: 0;
      margin-top: 1.333vw;
      padding-bottom: 1.333vw;
      font-size: 3.2vw;
      color: #999;
    }
  }
}
</style>