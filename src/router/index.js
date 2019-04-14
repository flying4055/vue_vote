import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // 首屏
    {
      path: "/",
      name: "index",
      hidden: true,
      component: () => import("@/view/Index"),
      meta: { title: "首页" }
    },
    // 活动主页
    {
      path: "/home/:pid",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/view/Works")
        }
      ]
    },
    {
      path: "/apply",
      hidden: true,
      component: Layout,
      children: [
        {
          path: "",
          name: "Apply",
          component: () => import("@/view/Apply"),
          meta: { title: "报名" }
        }
      ]
    },
    {
      path: "/intro",
      hidden: true,
      component: Layout,
      children: [
        {
          path: "/",
          name: "intro",
          component: () => import("@/view/Intro"),
          meta: { title: "活动简介" }
        }
      ]
    },
    {
      path: "/prize",
      hidden: true,
      component: Layout,
      children: [
        {
          path: "/",
          name: "prize",
          component: () => import("@/view/Prize"),
          meta: { title: "活动奖品" }
        }
      ]
    },
    // 作品详情
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
