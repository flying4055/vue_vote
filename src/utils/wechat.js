let wechat = function(){
   wechat.ready(function () {
     let self = this;
      console.log(self.$route);
      let location_url = window.location.hostname + "/#" + self.$route.path;
      let img_url = document.getElementsByTagName('img')[0].src;
      console.log(self.$route);
      console.log(location_url);
      console.log(img_url);
      wechat.onMenuShareAppMessage({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: location_url, // 分享链接
        imgUrl: img_url, // 分享图标
        success: function (res) {
          // 用户确认分享后执行的回调函数
          console.log(res)
        }
      });
      wechat.onMenuShareTimeline({
        title: document.title, // 分享标题
        link: location_url, // 分享链接
        imgUrl: img_url, // 分享图标
        success: function (res) {
          // 用户确认分享后执行的回调函数
          console.log(res)
        }
      })
    });
}