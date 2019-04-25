<template>
  <div>
    <h2>login ...</h2>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Store from "../store";

export default {
  name: "login",
  data() {
    return {
      user: "",
      beforeLoginUrl: ""
    };
  },
  created() {
    // 检测会员有没有登录
    if (!Store.state.token) {
      // if (!Store.state.beforeLoginUrl) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("跳转到微信授权页面");
        // 跳转到微信授权页面
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx581ac1620490998c&redirect_uri=http%3a%2f%2fvote.crjblog.cn%2fapi%2fweixin%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE";
      }
    } else {
      // 	// 如果有token 但是vuex中没有用户登录信息则做登录操作
      // 	// this.login();
      console.log("登录操作");
      console.log(this.$store);
      return false;
    }
  },
  methods: {
    login() {
      this.beforeLoginUrl = Cookies.get("beforeLoginUrl");
      let OPENID = "";
      let ACCESS_TOKEN = "";
      let url =
        "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
      // 通过cookie中保存的token 获取用户信息
      console.log("通过cookie中保存的token 获取用户信息");
      this.$axios.get(url).then(response => {
        response = response.body;
        if (response) {
          // 保存用户登录状态(Vuex)
          // this.$store.commit("user", response);
          Cookies.set("user_info", response);
          setTimeout(() => {
            this.goBeforeLoginUrl(); // 页面恢复(进入用户一开始请求的页面)
          }, 2000);
          console.log("页面恢复(进入用户一开始请求的页面)");
        } else {
          // this.$alert("服务器撸猫去惹 :(", "wrong");
          if (Cookies.get("user")) {
            // 跳转到微信授权页面
            console.log("跳转到微信授权页面");

            window.location.href =
              this.webUrl + "/Wap/User/getOpenid";
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
