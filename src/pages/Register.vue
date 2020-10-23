<template>
  <div class="regiter">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
  <van-field  ref="aa" label="文本"  placeholder="请输入用户名" />
  </div>
</template>

<script>
export default {  
    methods:{
      register(){
        console.log('我注册了');
      }
    },data(){
      return {
        username :''
      }
    },
    mounted(){
      this.$refs.aa.focus();
    }
}
</script>

<style>

</style>