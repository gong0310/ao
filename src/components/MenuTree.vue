<template>
  <div>
    <template v-for="menu in this.menuData">
      <el-submenu :key="menu.id" :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span :style="isCollapse ? 'opacity: 0;' : ''" slot="title">{{
            menu.name
          }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.id" :index="menu.path" v-else>
        <i :class="menu.icon"></i>
        <span :style="isCollapse ? 'opacity: 0;' : ''" slot="title">{{
          menu.name
        }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    menuData: {
      type: Array,
      default: () => [],
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  name: "MenuTree",
};
</script>
