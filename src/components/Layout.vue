<template>
  <div>
    <div class="app-main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <van-tabbar v-model="active" active-color="#f00" fixed>
      <van-tabbar-item icon="home-o" :to="{ name:'home', params: { pid: app.active_id } }">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/apply">报名</van-tabbar-item>
      <van-tabbar-item icon="notes-o" to="/intro">活动介绍</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/prize">活动奖品</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0
    };
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
