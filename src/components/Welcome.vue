<template>
  <div class="welcome-container" v-title="'主页'">
      <div class="card welcome-card">
        <h1>欢迎使用后台管理系统</h1>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
$themeColor: #20A0FF;
.welcome-card{
    padding: 50px 0;
    text-align: center;
    color: $themeColor;
}
</style>