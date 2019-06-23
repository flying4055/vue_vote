<template>
    <div>
        <h1>Pages 404 ...</h1>
        <h2>Not Found Page ...</h2>
        <h3>
          <router-link :to="{ path: 'login' }">点击这里</router-link>
        </h3>
    </div>
</template>

<script>
    export default {
        name:'page404'
    }
</script>

<style scoped>

</style>
