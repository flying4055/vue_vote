<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div v-html="$store.state.db.answer">

    </div>
  </div>
</template>

<script>
export default {
  // 奖品
  name: "prize",
  data() {
    return {
      imageList: [
        {
          id: 1,
          img: "https://img.yzcdn.cn/2.jpg"
        },
        {
          id: 2,
          img: "https://img.yzcdn.cn/2.jpg"
        },
        {
          id: 3,
          img: "https://img.yzcdn.cn/2.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
