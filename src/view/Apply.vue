<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <van-cell-group>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" error />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
    </van-cell-group>
    <form v-on:submit.prevent="onSubmit"></form>
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      username: "yang",
      phone: "17612345678"
    };
  },
  methods: {
    postApply() {
      let self = this;
      return false;
      this.$axios.get("/api/event/apply", {
        params: {

        }
      }).then(function (res) {
        console.log(res);
        if (res.code === 1) {
          self.listData = [];
          self.listData = res.data;
          // self.$toast(res.msg);
        } else {
          self.$toast(res.msg);
        }
      });
    },
  }
};
</script>

<style scoped>
</style>
