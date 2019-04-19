<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div class="content" v-html="$store.state.db.answer"></div>
  </div>
</template>

<script>
export default {
  // 奖品
  name: "prize",
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.content {
  padding: 0 14px;
}
</style>
