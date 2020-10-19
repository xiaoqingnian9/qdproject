<template>
    <div class="hm-button">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .hm-button{
        margin: 20px 20px;
        height: 50px;
        line-height: 50px;
        background-color: red;
        color: white;
        text-align: center;
        font-size: 18px;
        border-radius: 25px;
    }
</style>