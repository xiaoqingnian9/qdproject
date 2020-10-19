<template>
  <div class="hm-header">
    <span class="iconfont iconjiantou2 left" @click="$router.go(-1)"></span>
    <div class="center"><slot></slot></div>
    <span class="right"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
div{
  background-color: pink;
}
  .hm-header{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 0 10px;
    text-align: center;
    .left,.right{
      width: 30px;
    }
    .center{
      flex: 1;
      font-weight: 700;
    }
  }
</style>