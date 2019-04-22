<template>
  <div>
    <h2>login ...</h2>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from "js-cookie"

export default {
  name: "login",
  data() {
    return {
      user: ""
    };
  },
  created() {
    // 检测会员有没有登录
    if (!this.$store.state.token) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // 跳转到微信授权页面
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx581ac1620490998c&redirect_uri=http%3a%2f%2fvote.crjblog.cn%2findex%2findex%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE";
      }
    } else {
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      this.login();
    }
  },
  methods: {
    login() {
      let beforeLoginUrl = Cookies.get("beforeLoginUrl");

      let url = this.webUrl + "/Wap/User/info";
      // 通过cookie中保存的token 获取用户信息
      this.$http.get(url).then(response => {
        response = response.body;
        if (response) {
          // 保存用户登录状态(Vuex)
          this.$store.commit("user", response);
          setTimeout(() => {
            this.goBeforeLoginUrl(); // 页面恢复(进入用户一开始请求的页面)
          }, 2000);
        } else {
          this.$alert("服务器撸猫去惹 :(", "wrong");
          if (holdno.cookie.get("user")) {
            // 跳转到微信授权页面
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
