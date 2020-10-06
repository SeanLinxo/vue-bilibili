import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      keepalive: true,
    },
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("../views/Article.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: () => import("../views/UserInfo.vue"),
    meta: {
      istoken: true,
    },
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import("../views/Edit.vue"),
    meta: {
      istoken: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

//全局导航守卫
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("token") &&
    !localStorage.getItem("id") &&
    to.meta.istoken == true
  ) {
    router.push("/login");
    Vue.prototype.$msg.fail("请先登录");
    return;
  }
  next();
});

export default router;
