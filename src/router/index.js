import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';
import EditUser from '../pages/EditUser.vue';
import MyFollow from '../pages/MyFollow.vue';
import MyComment from '../pages/MyComment.vue';

Vue.use(VueRouter);

const router=new VueRouter({
    //配置路由规则
    routes:[
        {
            path:'/',
            redirect:'/login'
        },{
        path:'/login',
        component:Login,
        name:'login'
    },{
        path:'/register',
        component:Register,
        name:'register'
    },{
        path:'/user',
        component:User,
        name:'user'
    },{
        path :'/editUser',
        component:EditUser,
        name:'editUser'
    },{
        path :'/myFollow',
        component:MyFollow,
        name:'myFollow'
    },{
        path :'/myComment',
        component:MyComment,
        name:'myComment'
        
    }]
});
//存放所有授权的路径
const authUrl=['/user','/editUser'];

//注册全局导航路由
router.beforeEach(function(to,from,next){
    const token=localStorage.getItem('token');
    if(authUrl.includes(to.path)  ){
        if(token){
            next();
        }else{
            next('/login')
        }
    }else{
        next()
    }
});

export default router;