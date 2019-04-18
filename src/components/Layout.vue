<template>
  <div>
    <div class="app-main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <van-tabbar v-model="$store.state.active" active-color="#f00" fixed>
      <van-tabbar-item icon="home-o" :to="{ name:'works', params: { pid: $store.state.pid } }">首页</van-tabbar-item>
      <van-tabbar-item icon="records" :to="{ name:'apply', params: { pid: $store.state.pid } }">报名</van-tabbar-item>
      <van-tabbar-item icon="notes-o" :to="{ name:'intro', params: { pid: $store.state.pid } }">活动介绍</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{ name:'prize', params: { pid: $store.state.pid } }">活动奖品</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      activeData: null
    }
  },
  mounted: function () {
    this.$store.commit('set_pid', this.$route.params.pid)
  }
};
</script>

<style scoped>
.app-main {
  /* min-height: 600px; */
  padding-bottom: 60px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
