<template>
  <div>

    <div style="padding:3px 14px;line-height:28px;color:#666;">
      <div class="video">
        <video :src="data.video_url" style="width:100%;"></video>
      </div>
      <div>
        <img :src="data.images" style="width:100%;height:200px;" alt="">
      </div>
      <van-row>
        <van-panel title="活动展示"></van-panel>
      </van-row>
      <div v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show',
  props: ['data'],
  mounted: function () {
    console.log(this.data)
  }
}
</script>

<style scoped>
</style>
