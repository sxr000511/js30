import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 服务
import Home from "./pages/home/Home.vue";
import Service from "./pages/home/Service.vue";
// 产品
import Product from "./pages/home/product/Product.vue";
import ProductList from "./pages/home/product/ProductList.vue";
import ProductEdit from "./pages/home/product/ProductEdit.vue";
// 登录
import Login from "./pages/Login.vue";
// 数据
import { getGlobalData } from "./utils/globalData";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter); // 使用 vue-router

// 配置路由信息
// 路由嵌套
const routes = [
  {
    path: "/", // 父路由路径
    component: App, // 父路由组件，传入 vue component
    name: "App", // 路由名称
    // 设置子路由
    children: [
      {
        path: "login", // 子路由路径
        component: Login, // 子路由组件，会替换父组件中<router-view>中的内容
        name: "Login" // 路由名称
      },
      {
        // 应用首页
        path: "home",
        component: Home,
        name: "Home",
        children: [
          // 服务列表
          { path: "service", component: Service, name: "Service" },
          // 产品容器
          {
            // product本身为空，内容都在children里
            path: "product",
            component: Product,
            name: "Product",
            children: [
              // 子路由内容
              // 产品列表
              { path: "list", component: ProductList, name: "ProductList" },
              // 产品新增
              { path: "add/0", component: ProductEdit, name: "ProductAdd" },
              // 产品编辑
              // 我们能看到，新增和编辑其实最终使用的是同一个组件
              // 当 edit/:id 匹配成功，
              // ProductEdit 会被渲染在 Product 的 <router-view> 中
              { path: "edit/:id", component: ProductEdit, name: "ProductEdit" }
            ]
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

// 添加路由守卫，保证进入login
router.beforeEach((to, from, next) => {
  if (to.name !== "Login") {
    // 非 login 页面，检查是否登录
    // 这里简单前端模拟是否填写了用户名，真实环境需要走后台登录，缓存到本地
    if (!getGlobalData("username")) {
      next({ name: "Login" });
    }
  }
  // 其他情况正常执行
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
