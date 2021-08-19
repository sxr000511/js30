import Vue from "vue";
import VueRouter from "vue-router";

import AddArticle from "../views/AddArticle";
import ListArticle from "../views/ListArticle";

import EditArticle from "../views/EditArticle";

Vue.use(VueRouter);

const routes = [
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
    path: "/articles/add",
    name: "add-article",
    component: AddArticle,
  },
  {
    path: "/articles/:id/edit",
    name: "edit-article",
    component: EditArticle,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
