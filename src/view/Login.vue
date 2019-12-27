<template>
  <div>
    <router-view></router-view>
    <h3 v-if="cli" style="text-align:center;">请在微信客户端登陆!</h3>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Store from "../store";

export default {
  name: "login",
  data() {
    return {
      cli: false,
      user: "",
      beforeLoginUrl: ""
    };
  },
  created() {
    document.title = "登陆中...";

    let ua = window.navigator.userAgent.toLowerCase();
    console.log(ua.match(/MicroMessenger/i));
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      console.log("跳转到微信授权页面");
      let host = window.location.hostname;
      // let host_arr = {
      //   "test.sxsgxf.cn": `wx54b9eb7dcfbf53d2`,
      //   "www.shanxiguyin.cn": `wxe27d25bc3f84aab9`,
      //   "www.ysxfbz.cn": `wx6a0eb033efd229c0`
      // };
      let appid = `wxe27d25bc3f84aab9`;
      // 跳转到微信授权页面
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=http%3a%2f%2f${host}%2fapi%2fweixin%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE`;
    } else {
      this.cli = true;
    }
  }
};
</script>

<style scoped>
</style>
