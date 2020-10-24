<template>
<div class="login">
  <!--<div class="header">
    <span class="iconfont iconjiantou2"></span>
    <div>登录</div>
  </div>-->
  <hm-header>登录</hm-header>
  <hm-logo></hm-logo>



  <hm-input 
  type='text' 
  placeholder='请输入用户名' 
  v-model="username"
  :rule="/^\d{4,10}$/"
  message="用户名格式不对"
  ref="username"
  ></hm-input>
  <hm-input type='password' placeholder='请输入密码' ref="password" v-model="password" :rule="/^\d{3,12}$/" message="密码格式不对"></hm-input>
  <hm-button @click="login">登录</hm-button>
<div class="go-register">没有账号,去<router-link class="link" to="/register">注册</router-link></div>
</div>
  
</template>

<script>
export default {
  methods:{
    login(){
       let username=this.$refs.username.validate(this.username);
       let password=this.$refs.password.validate(this.password);
       if(!username ||  !password){
            return;
       }
      
       
      this.$axios({
        method:'post',
        url:'/login',
        data:{
          username:this.username,
          password:this.password
        }
      }).then(res=>{
       // console.log(res.data)
       if(res.data.statusCode===200){
         this.$toast.success('登录成功')
          this.$router.push('/user');
       }else{
          this.$toast.fail('用户名或密码错误')
       }
      });;
    }
  },
  data(){
    return {
      username:'',
      password:''
    }
  }
}
</script>

<style lang='less' scroped>
  .go-register{
    font-size: 18px;
    text-align: right;
    padding: 0 20px;
    .link{
      color:orange;
    }
  }
</style>