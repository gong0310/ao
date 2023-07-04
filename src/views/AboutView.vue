<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-permission="['add']">add</li>
      <li v-permission="['ad']">ad</li>
      <li v-permission="['delet']">delet</li>
      <i class="iconfont icon-a-business-icon-AlibabacomOnlineTradeShow" />
      <i class="iconfont icon-a-business-icon-Bigpromotion" />
      <i class="iconfont icon-business-icon-buyers-club-fill" />
    </ul>
  </div>
</template>
<script>
export default {
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  i {
    font-size: 24px;
    color: pink;
  }
}
</style>
