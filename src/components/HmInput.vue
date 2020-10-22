<template>
  <div class="hm-input">
      <input :type="type" 
      :placeholder="placeholder" 
      :class="{success:status==='success',error:status==='error'}" 
      :value="value" 
      @input="inputFn"
      
      />
      <div class="tip" v-show="status==='error'">{{message}}</div>
  </div>
  
</template>

<script>
export default {
    data(){
       return {
           status:''
       }
   },
   // props:['type','placeholder']
   props:{
       type:{
           type:String,
           default:'Text' 
       },
       placeholder:{
           type:String,
           default:'请输入'
       },
       value:String,
       rule:RegExp,
       message:String
   },methods:{
        inputFn(e){
           this.$emit('input',e.target.value)
           let value=e.target.value;
           if(this.rule){
            if(this.rule.test(value)){
                this.status='success' 
            }else{
                this.status='error'
            }
           }
           console.log(this.rule+'-------------'+this.message);
        }
   },
   
}
</script>

<style lang="less" scoped>
        .hm-input{
            height: 50px;
            margin: 0 10px;
            input{
                height: 30px;
                line-height: 30px;
                 outline: none; 
                 border: none;
                border-bottom: 1px solid #ccc;
                width: 100%;
                font-size: 16px;
                color: #666;
                 &.success{
                border-color: green;
                     }

                &.error{
                    border-color: red;
                }
            }
            .tip{
                font-size: 14px;
                color: red;
                height: 20px;
                line-height: 20px;
            }
           
        }
</style>