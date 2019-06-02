import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Dialog } from 'vant';
Vue.use(VueAxios, axios);
import wechat from "weixin-js-sdk";
var VoteWeixin = {
  share: function (title = '', desc = '', image = '') {
    let self = this;
    let _url = encodeURIComponent(window.location.href.split('#')[0]);
    axios.get('/api/weixin/jsSignature', { params: { url: _url } }).then((res) => {
      if (res.code == 200) {
        let resData = res.data;
        wechat.config({
          appId: resData.appId,
          debug: resData.debug,
          nonceStr: resData.nonceStr,
          signature: resData.signature,
          timestamp: resData.timestamp,
          // jsApiList: resData.jsApiList,
          jsApiList: [  // 用的方法都要加进来
            'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage'
          ]
        });
        wechat.ready(function () {
          let params = window.location.href.split('#');
          let shareUrl = 'http://' + params[0].split('/')[2] + '/#' + params[1];
          let wx_title = title || document.title;
          let wx_desc = desc || "来自杉杉互娱公众号的分享";
          let wx_url = 'http://' + params[0].split('/')[2] + '/static/redirect.html?app3Redirect=' + encodeURIComponent(shareUrl);
          let wx_image = image || '';
          wechat.onMenuShareAppMessage({
            title: wx_title, // 分享标题
            desc: wx_desc, // 分享描述
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
            }
          });
          wechat.onMenuShareTimeline({
            title: wx_title, // 分享标题
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
            }
          });
          // and 1.4.0
          wechat.updateAppMessageShareData({
            title: wx_title, // 分享标题
            desc: wx_desc, // 分享描述
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
            }
          });
          wechat.updateTimelineShareData({
            title: wx_title, // 分享标题
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
            }
          })
        });
      }
    }).catch((err) => {
    });
  },
  payment: function (works_id = 0, amount = 0) {
    let self = this;
    let _url = encodeURIComponent(window.location.href.split('#')[0]);
    axios.get('/api/weixin/jsSignature', { params: { url: _url } }).then((res) => {
      if (res.code == 200) {
        let resData = res.data;
        wechat.config({
          appId: resData.appId,
          debug: resData.debug,
          jsApiList: resData.jsApiList,
          nonceStr: resData.nonceStr,
          signature: resData.signature,
          timestamp: resData.timestamp
        });
        wechat.ready(function () {
          let params = {
            // vote_id: vote_id,
            works_id: works_id,
            amount: amount
          }
          axios.post("/api/event/pay", params).then(function (res) {
            wechat.chooseWXPay({
              appId: res.data.appId,
              timestamp: res.data.timestamp, // 支付签名时间戳
              nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
              package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.paySign, // 支付签名
              success: function (res) {
                //支付成功
              },
              cancel: function (res) {
                //支付取消
              }
            });
          }).catch(function (error) {
          });

        })
      }
    })
  }
};
export default VoteWeixin;
