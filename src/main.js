import Vue from 'vue'
import App from './App.vue'
//导入通用样式
import './styles/base.less'
//导入字体图标样式
import './styles/iconfont.less'
//导入Lib-flexible模块，会自动适配屏幕
import 'lib-flexible'
import router from './router'
import axios from 'axios';
axios.defaults.baseURL='http://127.0.0.1:3000'
//把axios绑定到VUE的原型上，目的是把当前所有的组件和实例都可以通过this.$axios 访问到axios 对象 
Vue.prototype.$axios=axios;



Vue.config.productionTip = false

//全局注册组件
import HmHeader from './components/HmHeader'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
import HmInput from './components/HmInput'
Vue.component('hm-header',HmHeader);
Vue.component('hm-logo',HmLogo);
Vue.component('hm-button',HmButton);
Vue.component('hm-input',HmInput);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
