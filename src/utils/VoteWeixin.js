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
          console.log('当前URL', self.$route)
          let params = window.location.href.split('#');
          let url = 'http://' + params[0].split('/')[2] + '/#' + params[1];
          let wx_title = title || window.document.title;
          let wx_desc = desc || "来自投票公众号的分享";
          let wx_url = url;
          let wx_image = image || document.getElementsByTagName("img")[0].src;
          console.log(wx_title)
          console.log(wx_desc)
          console.log(wx_url)
          console.log(wx_image)
          wechat.onMenuShareAppMessage({
            title: wx_title, // 分享标题
            desc: wx_desc, // 分享描述
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log(res)
            }
          });
          wechat.onMenuShareTimeline({
            title: wx_title, // 分享标题
            link: wx_url, // 分享链接
            imgUrl: wx_image, // 分享图标
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
  payOrder: function (vote_id = 0, works_id = 0, amount = 0) {
    let self = this;
    let _url = encodeURIComponent(window.location.href.split('#')[0]);
    let params = { params: { url: _url } };
    axios.get('/api/weixin/jsSignature', params).then((res) => {
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

          let params = {
            vote_id: vote_id,
            works_id: works_id,
            amount: amount
          }
          axios.post("/api/event/pay", params).then(function (res) {
            console.log(res);
            wechat.chooseWXPay({
              appId: res.data.appId,
              timestamp: res.data.timestamp, // 支付签名时间戳
              nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
              package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.paySign, // 支付签名
              success: function (res) {
                //支付成功
                console.log(res)
                console.log('支付成功')
                // window.location.href = ''
              },
              cancel: function (res) {
                //支付取消
                console.log(res)
                console.log('支付取消')
              }
            });
          })

        })
      }
    }).catch((err) => {
      console.log(err);
    });
  },

  payment: function (vote_id = 0, works_id = 0, amount = 0) {
    let params = {
      vote_id: vote_id,
      works_id: works_id,
      amount: amount
    }
    axios.post("/api/event/pay", params).then(function (res) {
      console.log(res);
      wechat.chooseWXPay({
        appId: res.data.appId,
        timestamp: res.data.timestamp, // 支付签名时间戳
        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: res.data.paySign, // 支付签名
        success: function (res) {
          //支付成功
          console.log(res)
          console.log('支付成功')
          // window.location.href = ''
        },
        cancel: function (res) {
          //支付取消
          console.log(res)
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
