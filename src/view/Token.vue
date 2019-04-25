<template>
  <div>
    <h1>Token ...</h1>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Store from "../store";


export default {
  name: "token",
  mounted() {
    console.log('token page' + this.$router);
    console.log(this.$route.params);
    console.log(this.$route.params.tokens);
    // Store.commit("set_token", this.$router.params.tokens);
    Cookies.set("token", this.$route.params.tokens);
    return false;
  }
};
</script>

<style scoped>
</style>
