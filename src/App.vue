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
    let self = this;
    this.$axios.get('/api/weixin/jsSignature').then((res) => {
      if (res.code == 200) {
        let resData = res.data;
        wechat.config({
          appId: resData.appId,
          debug: resData.debug,
          jsApiList: resData.jsApiList,
          nonceStr: resData.nonceStr,
          signature: resData.signature,
          timestamp: resData.timestamp
        })
      }
    }).catch((err) => {
      console.log(err);
    })
    wechat.error(function (res) {
      console.log('验证失败返回的信息:', res);
    });
    wechat.ready(function () {
      let location_url = encodeURIComponent(window.location.href.split('#')[0]);
      //  + '#' + self.$route.path
      wechat.onMenuShareAppMessage({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: location_url, // 分享链接
        imgUrl: 'imgUrl123', // 分享图标
        success: function (res) {
          // 用户确认分享后执行的回调函数
          console.log('用户确认分享后执行的回调函数11111')
          console.log(res)
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('用户取消分享后执行的回调函数222222222')
          console.log(res)
        }
      });
      wechat.onMenuShareTimeline({
        title: document.title, // 分享标题
        link: location_url, // 分享链接
        imgUrl: "imgUrl分享图标", // 分享图标
        success: function (res) {
          // 用户确认分享后执行的回调函数
          console.log('用户确认分享后执行的回调函数33333')
          console.log(res)
        },
        cancel: function (res) {
          // 用户取消分享后执行的回调函数
          console.log('用户取消分享后执行的回调函数44444')
          console.log(res)
        }
      });
    });

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
