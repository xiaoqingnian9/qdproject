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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
