import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//按需引入vant
import "./plugins/vant.js";
// 引入axios
import http from "../http.js";
//引入Vant-Toast
import { Toast } from "vant";
//引入字体图标
import "../src/assets/style.css";

Vue.prototype.$http = http;
Vue.prototype.$msg = Toast;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
