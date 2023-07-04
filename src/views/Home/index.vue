<template>
  <el-container class="home-container">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="home-container-logo">
        <img v-if="isCollapse" src="@/assets/logo.png" alt="" />
        <span v-else @click="handleClipboard('哈哈哈', $event)"
          >后台数据管理</span
        >
      </div>
      <el-menu
        background-color="#fff"
        text-color="#333"
        active-text-color="#ea5420"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="true"
        :router="true"
        :default-active="activePath"
        @select="handleSelectMenu"
      >
        <menu-tree
          :isCollapse="isCollapse"
          :menuData="$store.state.menuList"
        ></menu-tree>
      </el-menu>
    </el-aside>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div
          class="home-container-toggle"
          @click="handleToggleCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></div>
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span>退出登录</span></el-dropdown-item>
            <el-dropdown-item><span>复制</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 右侧内容主体 -->
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件-->
          </router-view>
        </keep-alive>

        <transition name="fade-transform" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件 -->
          </router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MenuTree from "@/components/MenuTree.vue";
import clipboard from "@/utils/clipboard";
export default {
  name: "Home",
  components: {
    MenuTree,
  },
  data() {
    return {
      isCollapse: false,
      activePath: "",
    };
  },
  mounted() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    handleToggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleSelectMenu(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
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
  border: none;
  .el-menu-item:hover {
    background-color: #fafafa !important;
  }
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-aside {
  height: 100vh;
  overflow-x: hidden;
  transition: all 0.3s;
  transition-timing-function: ease-in-out;
  background-color: aquamarine;
}

.el-icon-setting {
  font-size: 22px;
  color: #ffffff;
  margin-right: 15px;
}
</style>
