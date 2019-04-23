import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      id: ""
    },
    token: "",
    count: 0,
    active: 0,
    pid: 1,
    db: null,
    default_img: '../assets/default.png'
  },
  mutations: {
    set_active(state, value) {
      state.active = value;
    },
    set_pid(state, value) {
      state.pid = value;
    },
    set_db(state, value) {
      state.db = value;
    }
  }
});

export default store;
