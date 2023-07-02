<template>
  <div class="container">
    <el-container>
      <el-header>Header</el-header>
      <el-container class="container-body">
        <el-aside class="menu-container">
          <!-- 实现菜单多级分类 -->
          <el-menu
            default-active="1-1-1-1"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- 引入组件 -->
            <menu-tree :menuData="menuList"></menu-tree>
          </el-menu>
        </el-aside>
        <el-main class="main-container">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "./MenuTree.vue";
export default {
  components: {
    MenuTree,
  },
  data() {
    return {
      menuList: [
        {
          id: "1",
          icon: "el-icon-menu",
          name: "一级菜单01",
          children: [
            {
              id: "1-1",
              icon: "el-icon-film",
              name: "二级菜单01",
              children: [
                {
                  id: "1-1-1",
                  icon: "el-icon-date",
                  name: "三级菜单01",
                  children: [
                    {
                      id: "1-1-1-1",
                      icon: "el-icon-monitor",
                      name: "四级菜单01",
                      children: [
                        {
                          id: "1-1-1-1-1",
                          icon: "el-icon-monitor",
                          name: "五级菜单01",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "1-1-2",
                  icon: "el-icon-headset",
                  name: "三级菜单02",
                },
              ],
            },
            {
              id: "1-2",
              icon: "el-icon-data-line",
              name: "二级菜单02",
            },
          ],
        },
        {
          id: "2",
          icon: "el-icon-s-data",
          name: "一级菜单02",
        },
        {
          id: "3",
          icon: "el-icon-s-operation",
          name: "一级菜单03",
        },
        {
          id: "4",
          icon: "el-icon-user",
          name: "一级菜单04",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
