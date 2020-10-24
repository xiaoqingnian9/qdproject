<template>
  <div class="regiter">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input placeholder='用户名/手机号码'  v-model="username" :rule="/^\d{4,10}$/"
  ref="username"
  message="用户名格式不对"
  ></hm-input>
    <hm-input placeholder='昵称' v-model="nickname"
    ref="nickname"
    :rule="/^[\u4e00-\u9fa5]/"
    message='用户的昵称必须是3-7位的中文'
    
    ></hm-input>
    <hm-input placeholder='密码' ref="password" v-model="password" :rule="/^\d{3,12}$/" message="密码格式不对"></hm-input>
    <hm-button @click="register">注册</hm-button>
    <div class="go-login">已有账号,去<router-link class="link" to="/login">登录</router-link></div>
 <!-- <van-field  ref="aa" label="文本"  placeholder="请输入用户名" />-->
  </div>
</template>



<script>
export default {  
    methods:{
      register(){
       // console.log('我注册了');
      let status1= this.$refs.username.validate(this.username);
      let status2= this.$refs.nickname.validate(this.nickname);
      let status3= this.$refs.password.validate(this.password);
      if(!status1 || !status2 || !status3){
          return;
      }

      this.$axios({
        method:'post',
        url:'/register',
        data:{
          username:this.username,
          password:this.password,
          nickname:this.nickname
        }
      }).then(res=>{
       if(res.data.statusCode===200){
         this.$toast.success(res.data.message)
        // this.$router.push( {path:'/login',query:{
         //   username:this.username,
        //    password:this.password
      //   }});

          this.$router.push( {name:'login',params:{
            username:this.username,
            password:this.password
         }});
       }else{
          this.$toast.fail(res.data.message)
       }
      });
      }
    },
    data(){
      return {
        username :'',
        password:'',
        nickname:''
      }
    },
    mounted(){
      //this.$refs.aa.focus();
    }
}
</script>

<style lang='less' scroped>
  .go-login{
    font-size: 18px;
    text-align: right;
    padding: 0 20px;
    .link{
      color:orange;
    }
  }
</style>