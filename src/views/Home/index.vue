<template>
  <el-container class="home-container">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="home-container-logo">
        <img v-if="isCollapse" src="@/assets/logo.png" alt="" />
        <span v-else>后台数据管理</span>
      </div>
      <el-menu
        background-color="#fff"
        text-color="#333"
        active-text-color="#ea5420"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath"
      >
        <!-- 引入组件 -->
        <menu-tree :isCollapse="isCollapse" :menuData="menuList"></menu-tree>
        <!-- <el-submenu
          :index="item.id + ''"
          v-for="item in menuList"
          :key="item.id"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            :index="'/' + subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="saveState('/' + subItem.path)"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ subItem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div
          class="home-container-toggle"
          @click="toggle"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span>退出登录</span></el-dropdown-item>
            <el-dropdown-item><span>关联店铺</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MenuTree from "@/components/MenuTree.vue";

export default {
  name: "Home",
  components: {
    MenuTree,
  },
  data() {
    return {
      isCollapse: false,
      activePath: "c",
      menuList: [
        {
          path: "/a",
          name: "a",
          id: "1",
          authName: "a",
          icon: "el-icon-picture",
          component: () => import("@/views/AboutView.vue"),
          children: [
            {
              path: "a",
              name: "a",
              id: "2",
              authName: "a1",
              icon: "el-icon-phone",
              component: () => import("@/views/AboutView.vue"),
              children: [
                {
                  path: "c",
                  name: "c",
                  id: "4",
                  authName: "a1",
                  icon: "el-icon-phone",
                  component: () => import("@/views/AboutView.vue"),
                },
              ],
            },
          ],
        },
        {
          path: "/h",
          name: "h",
          id: "3",
          authName: "h",
          icon: "el-icon-edit",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    };
  },
  mounted() {
    // this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    saveState(activePath) {
      // window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
  .home-container-logo {
    height: 60px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
  .home-container-toggle {
    background-color: #ea5420;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    padding-left: 10px;
    font-size: 22px;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-header {
  background-color: #ea5420;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-menu {
  overflow: hidden;
  border-right: 0;
  .el-menu-item:hover {
    background-color: #fafafa !important;
  }
}
.el-aside {
  transition-property: width;
  transition-duration: 0.25s, 0.5s;
  background-color: aquamarine;
}

.el-icon-setting {
  font-size: 22px;
  color: #ffffff;
}
</style>
