<template>
  <div class="my-comment">
      <hm-header>我的跟帖</hm-header>
      <div class="list">
          <div class="item" v-for="item in list" :key="item.id">
              <div class="time">{{item.create_date | date('YYYY-MM-DD mm:ss')}}</div>
                <div class="parent-comment" v-if="item.parent">
                    <div class="parent-name">回复: {{item.parent.user.nickname}}</div>
                    <div class="parent-content">{{item.parent.content}}</div>
                </div>

              <div class="content">{{item.content}}</div>
              <div class="link" @click="$router.push(`/post-detaial/${item.post.id}`)">
                  <div class="title one-txt-cut">
                      原文:{{item.post.title}}
                  </div>
                  <span class="iconfont iconjiantou1"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            list : []
        }
    },
    created(){
        this.getCommentList();
    },
    methods:{
        getCommentList(){
            this.$axios({
                method:'get',
                url:'user_comments'
            }).then((res)=>{
                const {statusCode,data}=res.data;
                if(statusCode===200){
                   this.list=data;
                }
            });
        }
    }

}
</script>

<style lang="less" scoped>
    .item{
        padding: 10px;
        border-bottom: 1px solid #ccc;
        .time{
            color: #999;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
        }
        .content{
            font-size: 16px;
            padding: 10px 0;
        }
        .link{
            color: #999;
            display: flex;
            margin-top: 10px;
            font-size: 14px;
            justify-content: space-between;
            .title{
                flex: 1;
            }
            span{
                width: 50px;
                text-align: right;
            }
        }
        .parent-comment{
            background-color: #ddd;
            padding: 10px;
            font-size: 14px;
            color: #999;
            line-height: 30px;
            .parent-name{
                font-size: 12px;
            }
        }
    }
</style>