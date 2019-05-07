import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import wechat from "weixin-js-sdk";
var VoteWeixin = {
  share: function (title = '', desc = '', image = '') {
    let self = this;
    let _url = encodeURIComponent(window.location.href.split('#')[0]);
    axios.get('/api/weixin/jsSignature', { params: { url: _url } }).then((res) => {
      if (res.code == 200) {
        let resData = res.data;
        console.log(resData);
        wechat.config({
          appId: resData.appId,
          debug: resData.debug,
          jsApiList: resData.jsApiList,
          nonceStr: resData.nonceStr,
          signature: resData.signature,
          timestamp: resData.timestamp
        });

        wechat.ready(function () {
          let self = this;
          let params = window.location.href.split('#');
          console.error('params', params[0].split('/'));
          var url = 'http://' + params[0].split('/')[2] + '/#' + params[1];
          console.error('url--->', url);
          wechat.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log(res)
            }
          });
          wechat.onMenuShareTimeline({
            title: title, // 分享标题
            link: url, // 分享链接
            imgUrl: image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log(res)
            }
          })
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
};
export default VoteWeixin;
