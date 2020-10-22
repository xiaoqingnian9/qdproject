<template>
  <div class="regiter">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {  
    methods:{
      register(){
        console.log('我注册了');
      }
    }
}
</script>

<style>

</style>