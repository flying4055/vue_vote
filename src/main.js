import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
import axios from "axios";
import qs from "qs";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://test.ssjunjun.com/";
// axios.defaults.baseURL = "http://yang.vote.test/";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log(token);
  if (token) {
    config.headers.token = token;
  }
  return config;
}, (error => {
  return Promise.reject(error);
}));

axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code === 900) {
      localStorage.clear();
      // window.location.href = '/login'
      // window.location.href = "/#/login"
      router.push({ name: "login" });
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    router.push({ name: "login" });
    // router.push({ name: "404" });
    console.log(error)
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs;
// 引入js cookie
import Cookies from "js-cookie";
Vue.prototype.$Cookies = Cookies;

// 关闭提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
