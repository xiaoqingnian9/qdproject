<template>
  <div>
      <hm-header>我的关注</hm-header>
    <div class='list'>
        <div class="item" v-for="item in list" :key="item.id">
            <div class="left">
                <img :src="$axios.defaults.baseURL+ item.head_img" alt=""/>
            </div>
            <div class="center">
                <div class="name">
                    {{item.nickname}}
                </div>
                <div class="date">
                    {{item.create_date | date}}
                </div>
            </div>
            <div class="right" @click="unFollow(item.id)">
                取消关注
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list :[]
        }
    },
    created(){
        this.getFollowList()
    },
    methods:{
        getFollowList(){
            this.$axios({
                methods:'get',
                url:'/user_follows'
            }).then((res)=>{
                const {statusCode,data}=res.data;
                if(statusCode===200){
                   this.list=data;
                }
});
        },
        unFollow(id){
            this.$dialog.confirm({
                title:'温馨提示',
                message:'你确定取消关注用户么'
            }).then(()=>{
                        this.$axios({
                            url:`/user_unfollow/${id}`,
                            method:'get'
                        }).
                        then((res)=>{
                            const {message,statusCode,data} =res.data;
                                if(statusCode===200){
                                    this.$toast.success(message);  
                                    this.getFollowList();
                                }else{
                                    this.$toast.fail(message);
                                }
                        }).catch(()=>{

                        });

            }).catch(()=>{
                this.$toast('操作取消')
            });;
        }
    }
}
</script>

<style lang="less" scoped>
    .list{
        .item{
            border-bottom: 1px solid #ccc;
            height: 80px;
            display: flex;
            justify-content: space-between; //左右贴边
            padding: 0 20px;
            align-items: center;
            .left{
                img{
                    width: 40px;
                    height: 40px;
                    display: block;
                    border-radius: 50%;
                }
            }
        }
        .center{
            flex: 1;
            padding: 10px;
            .name{
                font-size: 14px;
            }
            .date{
                color: #999;
            }
        }
        .right{
            background-color: #dddddd;
            padding:0 15px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color: #000;
        }
    }
</style>