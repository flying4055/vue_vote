import Vue from "vue";
import Router from "vue-router";
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
      meta: { title: "登陆" }
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
    // 礼物助力 gem
    {
      path: "/gem/:works_id",
      hidden: true,
      name: "gem",
      component: () => import("@/view/Gem"),
      meta: { title: "礼物助力" }
    },
    // 投诉 complain
    {
      path: "/complain",
      hidden: true,
      name: "complain",
      component: () => import("@/view/Complain"),
      meta: { title: "投诉" }
    },
    {
      path: "/buy/:id",
      hidden: true,
      name: "buy",
      component: () => import("@/view/Buy"),
      meta: { title: "抢购" }
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/view/Page404"),
      hidden: true
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   var params = to.fullPath.split('/');
//   var token = localStorage.getItem('token');
//   if (params[1] == "login" && params[2] == 'token') {
//     localStorage.setItem('token', params[3]);
//     var url = localStorage.getItem("beforeUrl");
//     var urlParam = url.split('/');
//     if (url == '' || urlParam[1] == "login") {
//       url = '/';
//     }
//     next(url);
//     return false;
//   } else if (!token && params[1] != "login") {
//     localStorage.setItem("beforeUrl", to.fullPath);
//     next("/login");
//     return false;
//   }
//   next();
// });

export default router;
