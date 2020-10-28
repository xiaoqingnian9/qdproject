import Vue from 'vue'
import App from './App.vue'
//导入通用样式
import './styles/base.less'
//导入字体图标样式
import './styles/iconfont.less'
//导入Lib-flexible模块，会自动适配屏幕
import 'lib-flexible'
import router from './router'

//使用vant-ui 的处理 全局加载
//import vant from 'vant';
//import 'vant/lib/index.css'
//Vue.use(vant);

//按需加载  babel-plugin-import
import { Toast ,Field,Dialog , RadioGroup, Radio,Cell,CellGroup,Uploader} from 'vant';
Vue.use(Toast);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);

import axios from 'axios';
axios.defaults.baseURL='http://127.0.0.1:3000'
//配置axios的响应拦截器 所有的axios的响应会先经过响应拦截器
axios.interceptors.response.use(function(res){
  console.log('-----------',res);
  const { statusCode,message}=res.data;
  if(statusCode===401&&message==='用户信息验证失败'){
    router.push('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    Toast.fail(message);
  }
   return res;
});

//把axios绑定到VUE的原型上，目的是把当前所有的组件和实例都可以通过this.$axios 访问到axios 对象 
Vue.prototype.$axios=axios;


//定义全局过滤器
import moment from 'moment'
Vue.filter('date',(input)=>{
  return moment(input).format('YYYY-MM-DD');
});


Vue.config.productionTip = false

//全局注册组件
import HmHeader from './components/HmHeader'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
import HmInput from './components/HmInput'
import HmNavbar from './components/HmNavbar'
Vue.component('hm-header',HmHeader);
Vue.component('hm-logo',HmLogo);
Vue.component('hm-button',HmButton);
Vue.component('hm-input',HmInput);
Vue.component('hm-navbar',HmNavbar);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
