<template>
<div class="user">
  <hm-header>个人中心</hm-header>
  <div class="info" @click="CheckInfo">
    <div class="left">
      <img :src="$axios.defaults.baseURL+user.head_img" alt=""/>
    </div>
    <div class="center">
        <div class="name">
          <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
          <span  v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date | date}}</div>
    </div>
    <div class="right">
       <span class="iconfont iconjiantou1"></span>
    </div>
  </div>

  <hm-navbar title="我的关注" content='关注的用户'></hm-navbar>
  <hm-navbar title="我的跟帖" content='跟帖/回复'></hm-navbar>
  <hm-navbar title="我的收藏" content='文章/视频'></hm-navbar>
  <hm-navbar title="设置" @click="CheckInfo"></hm-navbar>
  <hm-navbar title="退出" @click="returnFn"></hm-navbar>
</div>
  
</template>

<script>
export default {
  data(){
      return {
        user:{},
      }
  },
  methods:{
    returnFn(){
     this.$dialog.confirm({
       titile:'温馨提示',
      message: '确定退出么',
    }).then(()=>{
       localStorage.removeItem('token');
       localStorage.removeItem('user_id');
       this.$router.push('/login');
       this.$toast.success('退出成功');
    }).catch(()=>{
      console.log('我取消');
      this.$toast.success('取消退出');
    });
    },
    CheckInfo(){
      this.$router.push('/editUser')
    }
  },
  created(){
    //获取用户个人详细信息
    const user_id=localStorage.getItem('user_id');
    const token=localStorage.getItem('token');
    this.$axios({
      methods:'get',
      //url:'/user/'+user_id
      url:`/user/${user_id}`,
      headers:{
        Authorization:token
      }
    }).then(res=>{
      const {message,statusCode,data} =res.data;
      if(statusCode===200){
         //this.$toast.success(message);  
         this.user=data;
      }else{
        this.$toast.fail(message);
      }
    });
  }

}
</script>

<style lang="less" scoped>
  .user{
    .info{
      height: 100px;
      border-bottom: 3px solid #ccc;
      align-items: center;
      display: flex;
      padding: 0 20px;
      .left{
        width: 70px;
        img{
          width: 70px;
          height: 70px;
          display: block;
          border-radius: 50%;
        }
      }
    }
    .center{
      flex: 1;
      padding: 0 10px;
      .name{
        span{
          font-size: 18px;
        }
        .iconxingbienan{
          color: blue;
        }
        .iconxingbienv{
          color: pink;
        }
      }
      .time{
        font-size: 14px;
        color: #999;
      }
    }
    .right{
      width: 30px;
      text-align: right;
    }
  }
</style>