import Vue from "vue";
import Router from "vue-router";
import ListArticle from "./views/ListArticle";
import CreateArticle from "./views/CreateArticle";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/articles/list",
    },
    {
      path: "/articles/list",
      name: "list-article",
      component: ListArticle,
    },
    {
      path: "/articles/create",
      name: "create-article",
      component: CreateArticle,
    },
  ],
});
