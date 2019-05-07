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
        // console.log(resData);
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
          // console.error('params', params[0].split('/'));
          var url = 'http://' + params[0].split('/')[2] + '/#' + params[1];
          // console.error('url--->', url);
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
  },
  payment: function () {
    axios.post("/WxPay/GetPaySign", { code: code, openid: openid })
      .then(function (res) {
        console.log(res);
        // $("#btnPay").removeAttr("disabled");
        if (res.openid != null && res.openid != undefined && res.openid != "") {
          window.localStorage.setItem("openid", res.openid);
        }
        wx.chooseWXPay({
          timestamp: res.data.timeStamp, // 支付签名时间戳
          nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
          package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.data.paysign, // 支付签名
          success: function (res) {
            //支付成功
            console.log('支付成功')
            // window.location.href = ''
          },
          cancel: function (res) {
            //支付取消
            console.log('支付取消')
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
export default VoteWeixin;
