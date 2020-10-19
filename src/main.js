import Vue from 'vue'
import App from './App.vue'
//导入通用样式
import './styles/base.less'
//导入字体图标样式
import './styles/iconfont.less'
//导入Lib-flexible模块，会自动适配屏幕
import 'lib-flexible'
import router from './router'
Vue.config.productionTip = false

//全局注册组件
import HmHeader from './components/HmHeader'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
Vue.component('hm-header',HmHeader);
Vue.component('hm-logo',HmLogo);
Vue.component('hm-button',HmButton);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
