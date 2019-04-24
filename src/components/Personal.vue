<template>
  <div>
    <div style="padding:8px 14px;color:#666;">
      <!-- 用户信息 -->
      <div class="userInfo">
        <div class="userInfo-img">
          <img v-if="data.user_image" :src="data.user_image" style="width:65px;height:65px;" alt="">
          <img v-else src="../assets/user_image.jpg" style="width:65px;height:65px;" alt="">
        </div>
        <div class="userInfo-content">
          <div v-html="data.user_name?data.user_name:'用户名称'"></div>
          <div v-html="data.user_intro"></div>
        </div>
      </div>
    </div>
    <van-row>
      <van-panel title="活动介绍"></van-panel>
      <div v-html="data.desc"></div>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'personal',
  props: ['data'],
  mounted: function () {
    console.log(this.data)
  }
}
</script>

<style>
.userInfo {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.userInfo-img {
  width: 65px;
  padding-right: 8px;
}

.userInfo-img img {
  width: 65px;
  border-radius: 100%;
}

.userInfo-content {
  flex: 1;
}
</style>

