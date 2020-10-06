<template>
  <div class="detail" @click="$router.push(`/article/${detailItem.id}`)">
    <div class="imgparent">
      <img :src="detailItem.img" />
      <div class="bottom">
        <div class="icon-play2"><span class="video">1233</span></div>
        <div class="icon-file-text">
          <span class="comment">{{
            !detailItem.commentlen ? 66 : detailItem.commentlen
          }}</span>
        </div>
      </div>
    </div>
    <p>{{ detailItem.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["detailItem"],
};
</script>

<style lang='less'>
.detail {
  img {
    width: 100%;
    height: 25vw;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 3.2vw;
  }
  .imgparent {
    position: relative;
    .bottom {
      padding: 1.333vw 2.778vw;
      position: absolute;
      bottom: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      justify-content: space-between;
      color: white;
      display: flex;
      left: 0;
      right: 0;
    }
  }
}
</style>