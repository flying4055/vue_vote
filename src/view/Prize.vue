<template>
  <div>
    <div class="content" v-html="$store.state.db.answer"></div>
  </div>
</template>

<script>
export default {
  // 奖品
  name: "prize",
  data() {
    return {
    }
  },
  mounted(){
    document.title = "活动奖品"
  }
};
</script>

<style scoped>
.content {
  padding: 0 14px;
}
</style>
