import Vue from "vue";
import VueRouter from "vue-router";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style
import Login from "@/views/Login";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

//静态路由
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
    meta: { title: "首页" },
  },
];

// 动态路由
const asyncRouter = [
  {
    path: "/a",
    name: "a",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/h",
    name: "h",
    component: () => import("../views/HomeView.vue"),
  },
];

// 模拟请求
const findRouteList = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(asyncRouter);
    }, 300);
  });
};

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

let isAddRouter = false; // 是否添加过路由
const whiteList = ["/", "/login"]; // 免登录白名单

async function addRouteList(to, from, next) {
  // 添加动态路由
  if (!isAddRouter) {
    const routeList = await findRouteList();
    routeList.forEach((i) => {
      router.addRoute(i);
    });
    isAddRouter = true;
    next({ ...to, replace: true }); // 保证路由添加完了再进入页面 (可以理解为重进一次), 不保留重复历史
  } else {
    next();
  }
}
router.beforeEach(async (to, from, next) => {
  // to.meta.keepAlive = false

  //路由跳转前，清空请求
  // clearPending();
  NProgress.start();
  if (whiteList.includes(to.path)) {
    next();
  } else {
    // 检查权限
    const authentication = localStorage.getItem("status");

    if (authentication) {
      addRouteList(to, from, next);
    } else {
      if (whiteList.includes(to.path)) {
        addRouteList(to, from, next);
      } else {
        next({
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        });
      }
    }
  }
});
router.afterEach((to) => {
  // 进度条
  NProgress.done();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
