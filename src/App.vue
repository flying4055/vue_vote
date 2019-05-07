<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 导入微信SDK
import wechat from "weixin-js-sdk";

export default {
  name: "App",
  provide() {
    return {
      app: this
    };
  },
  mounted() {
    // let self = this;
    // let _url = encodeURIComponent(window.location.href.split('#')[0]);
    // this.$axios.get('/api/weixin/jsSignature', { params: { url: _url } }).then((res) => {
    //   if (res.code == 200) {
    //     let resData = res.data;
    //     console.log(resData);
    //     wechat.config({
    //       appId: resData.appId,
    //       debug: resData.debug,
    //       jsApiList: resData.jsApiList,
    //       nonceStr: resData.nonceStr,
    //       signature: resData.signature,
    //       timestamp: resData.timestamp
    //     })
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // })

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
}
</style>
