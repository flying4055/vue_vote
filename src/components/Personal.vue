<template>
  <div>

    <div style="padding:3px 14px;line-height:28px;color:#666;">
      <!-- 用户信息 -->
      <div class="userInfo">
        <div>
          <img :src="data.user_image" style="width:100%;height:75%;" alt="">
        </div>
        <div v-html="data.user_name"></div>
        <div v-html="data.user_intro"></div>
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
  align-items: flex-end;
}
</style>

