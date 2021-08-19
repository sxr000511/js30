import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";

Vue.config.productionTip = false;

// 引用axios，使用create创建一个axios请求，挂载到vue原型上，名字是$http
// baseurl接口根地址
// this.$http可以访问到axios实例
import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3001/api",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
