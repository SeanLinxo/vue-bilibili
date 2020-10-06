<template>
  <div>
    <nav-bar
      :imgSrc="model.user_img"
      @infoPage="$router.push('/userinfo')"
      @loginPage="$router.push('/userinfo')"
    ></nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab
        v-for="(item, index) in category"
        :title="item.title"
        :key="index"
      >
        <van-list
          v-model="item.loading"
          :immediate-check="false"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="detailParent">
            <detail
              class="detailItem"
              :detailItem="item1"
              v-for="(item1, index1) in item.list"
              :key="index1"
            ></detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <back-top distance="300"></back-top>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
import Detail from "./Detail.vue";
import BackTop from "../components/backTop/BackTop.vue";

export default {
  data() {
    return {
      category: [],
      active: 0,
      model: {},
    };
  },
  components: {
    NavBar,
    Detail,
    BackTop,
  },
  created() {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
    }
    this.selectCategory();
  },
  methods: {
    //获取用户数据
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    //获取首页category数据
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    //改造category
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.pagesize = 10;
        item.loading = true;
        item.finished = false;
        return item;
      });
      this.category = category1;
      this.selectArtical();
    },
    //获取当前active标签的categpry信息
    async selectArtical() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize,
        },
      });
      categoryItem.list.push(...res.data);
      categoryItem.loading = false;
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finished = true;
      }
    },
    //获取当前活跃标签的category
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    //下拉加载数据
    onLoad() {
      const categoryItem = this.categoryItem();
      setTimeout(() => {
        categoryItem.page += 1;
        this.selectArtical();
      }, 1000);
    },
  },
  //监听active下标改变事件
  watch: {
    active() {
      const categoryItem = this.categoryItem();
      if (!categoryItem.list.length) {
        this.selectArtical();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.detailParent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  .detailItem {
    margin: 1.389vw 0;
    width: 45vw;
  }
}
</style>