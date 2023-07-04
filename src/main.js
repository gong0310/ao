import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import firective from "./directive/index";

Vue.use(firective);
Vue.config.productionTip = false;

Vue.use(Element, {
  size: "medium", // set element-ui default size
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
