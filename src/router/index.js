import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import Cookies from "js-cookie";
import Layout from "@/components/Layout";

Vue.use(Router);

const router = new Router({
  linkActiveClass: "router-link-active",
  routes: [
    // 首屏
    {
      path: "/",
      name: "index",
      hidden: true,
      component: () => import("@/view/Index"),
      meta: { title: "首页" }
    },
    {
      path: "/login",
      name: "login",
      hidden: true,
      component: () => import("@/view/Login"),
      meta: { title: "登陆" },
      children: [
        {
          path: "token",
          name: "token",
          component: () => import("@/view/token"),
          meta: { title: "token" }
        }
      ]
    },
    // 活动主页
    {
      path: "/home/:pid",
      component: Layout,
      children: [
        {
          path: "",
          name: "works",
          component: () => import("@/view/Works"),
          meta: { title: "活动主页" }
        },
        {
          path: "apply",
          name: "apply",
          component: () => import("@/view/Apply"),
          meta: { title: "报名" }
        },
        {
          path: "intro",
          name: "intro",
          component: () => import("@/view/Intro"),
          meta: { title: "活动简介" }
        },
        {
          path: "prize",
          name: "prize",
          component: () => import("@/view/Prize"),
          meta: { title: "活动奖品" }
        }
      ]
    },
    {
      path: "/detail/:id",
      name: "detail",
      hidden: true,
      component: () => import("@/view/Detail"),
      meta: { title: "作品详情" }
    },
    // 票榜
    {
      path: "/ranking",
      hidden: true,
      name: "ranking",
      component: () => import("@/view/Ranking"),
      meta: { title: "票榜" }
    },
    {
      path: "*",
      component: () => import("@/view/Page404"),
      hidden: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to.fullPath);
  // console.log(from);
  console.log(this.$store);
  // if (!store.state.token && to.path != "/login") {
  if (to.path != "/login") {
    // 第一次进入项目
    let fullPath = to.fullPath;
    Cookies.set("beforeLoginUrl", to.fullPath);
    next("/login");
    return false;
  }
  next();
});

export default router;
