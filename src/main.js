import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vue2Editor from "vue2-editor";
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.101.10';
// axios.defaults.withCredentials = true;
axios.defaults.headers.common["my-api-version"] = "v1";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vue2Editor);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
