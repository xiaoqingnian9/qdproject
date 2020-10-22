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
  ></hm-input>
  <hm-input type='password' placeholder='请输入密码' v-model="password" :rule="/^\d{3,12}$/" message="密码格式不对"></hm-input>
  <hm-input></hm-input>
  <hm-button @click="login">登录</hm-button>
</div>
  
</template>

<script>
export default {
  methods:{
    login(){
      this.$axios({
        method:'post',
        url:'/login',
        data:{
          username:this.username,
          password:this.password
        }
      }).then(res=>{
       // console.log(res.data)
       if(res.data.statusCode){
          this.$router.push('/user');
       }else{

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

</style>