import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: "" || Cookies.get("token"),
    beforeLoginUrl: "" || Cookies.get("beforeLoginUrl"),
    count: 0,
    active: 0,
    pid: 1,
    works_id: 0,
    db: null,
    default_img: "../assets/default.png"
  },
  mutations: {
    set_token(state, value) {
      state.token = value;
    },
    set_db(state, value) {
      state.db = value;
    },
    set_beforeLoginUrl(state, value) {
      state.beforeLoginUrl = value;
    },
    set_active(state, value) {
      state.active = value;
    },
    set_pid(state, value) {
      state.pid = value;
    },
    set_works_id(state, value) {
      state.works_id = value;
    }
  }
});

export default store;
