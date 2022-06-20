import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import preventReClick from '@/directives/preventReClick'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/output.scss'


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(preventReClick)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
