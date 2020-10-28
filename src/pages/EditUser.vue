<template>
    <div class="userEdit">
        <hm-header>编辑用户</hm-header>
        <div class="avatar">
            <van-uploader :after-read="afterRead" class="uploader" :before-read="beforeRead" />
            <img :src="$axios.defaults.baseURL+userInfo.head_img" alt="">
        </div>
        <hm-navbar title="昵称" :content="userInfo.nickname" @click="shouNikename"></hm-navbar>
        <hm-navbar title="密码" :content="userInfo.password | password" @click="shouNiPassWord"> </hm-navbar>
        <hm-navbar title="性别" :content="userInfo.gender===0?'女':'男' " @click="showGender"></hm-navbar>
        
       

        <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNikeName">
            <van-field v-model="nickname" placeholder="请输入昵称"/>
        </van-dialog>

        <van-dialog v-model="passwordShow" title="修改密码" show-cancel-button @confirm="editPassWord">
            <van-field v-model="password" placeholder="请输入密码"/>
        </van-dialog>

        <van-dialog v-model="genderShow" title="修改性别" show-cancel-button @confirm="editGender">

                <van-radio-group v-model="gender">
                <van-cell-group>
                    <van-cell title="女" clickable @click="gender = 0 ">
                        <van-radio :name="0"></van-radio>
                    </van-cell>
                    <van-cell title="男" clickable @click="gender = 1 ">
                        <van-radio :name="1"></van-radio>
                    </van-cell>
                    </van-cell-group>
                 </van-radio-group>
        </van-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:{
                password:''
            },
            show:false,
            passwordShow:false,
            genderShow:false,
            gender: '',
            nickname:'',
            password:''
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        beforeRead(file){
           if(file.size/1024>=200){
               this.$toast.fail('文件大小不能大于等于200');
               return false;
           }     
        }
        ,
        afterRead(file){
            const token=localStorage.getItem('token');
            const fd=new FormData();
            fd.append('file',file.file);
             this.$axios({
                url:'/upload',
                method:'post',
                headers:{
                    Authorization:token
                },
                data:fd
            }).
            then((res)=>{
                 const {message,statusCode,data} =res.data;
                    if(statusCode===200){
                        //this.getUser();
                        //this.$toast.success(message);  

                        const user_id=localStorage.getItem('user_id');
                        const token=localStorage.getItem('token');
                        this.$axios({
                            url:`/user_update/${user_id}`,
                            method:'post',
                            headers:{
                                Authorization:token
                            },
                            data:{
                                head_img:data.url
                            }
                        }).
                        then((res)=>{
                            const {message,statusCode,data} =res.data;
                                if(statusCode===200){
                                    this.getUser();
                                    this.$toast.success(message);  
                                }else{
                                    this.$toast.fail(message);
                                }
                        }).catch(()=>{

                        });









                    }else{
                        this.$toast.fail(message);
                    }
            }).catch(()=>{

            });
        },
        editPassWord(){
            this.userInfo.password=this.password;
            const user_id=localStorage.getItem('user_id');
            const token=localStorage.getItem('token');
            this.$axios({
                url:`/user_update/${user_id}`,
                method:'post',
                headers:{
                    Authorization:token
                },
                data:{
                    password:this.password
                }
            }).
            then((res)=>{
                 const {message,statusCode,data} =res.data;
                    if(statusCode===200){
                        this.getUser();
                        this.$toast.success(message);  
                    }else{
                        this.$toast.fail(message);
                    }
            }).catch(()=>{

            });
        },
        editNikeName(){
            //alert(1)
            this.userInfo.nickname=this.nickname;
            const user_id=localStorage.getItem('user_id');
            const token=localStorage.getItem('token');
            this.$axios({
                url:`/user_update/${user_id}`,
                method:'post',
                headers:{
                    Authorization:token
                },
                data:{
                    nickname:this.nickname
                }
            }).
            then((res)=>{
                 const {message,statusCode,data} =res.data;
                    if(statusCode===200){
                        this.getUser();
                        this.$toast.success(message);  
                    }else{
                        this.$toast.fail(message);
                    }
            }).catch(()=>{

            });
        },
        shouNikename(){
            this.show=true;
            this.nickname=this.userInfo.nickname;
        },
        shouNiPassWord(){
            this.passwordShow=true;
            this.password=this.userInfo.password;
        },
        showGender(){
            this.genderShow=true;
            this.gender=this.userInfo.gender;
        },
        editGender(){
            this.userInfo.nickname=this.nickname;
            const user_id=localStorage.getItem('user_id');
            const token=localStorage.getItem('token');
            this.$axios({
                url:`/user_update/${user_id}`,
                method:'post',
                headers:{
                    Authorization:token
                },
                data:{
                    gender:this.gender
                }
            }).
            then((res)=>{
                 const {message,statusCode,data} =res.data;
                    if(statusCode===200){
                        this.getUser();
                        this.$toast.success(message);  
                    }else{
                        this.$toast.fail(message);
                    }
            }).catch(()=>{

            });
        },
        getUser(){
            const user_id=localStorage.getItem('user_id');
            const token=localStorage.getItem('token');
            
            this.$axios({
                methods:'get',
                url:`/user/${user_id}`,
                headers:{
                    Authorization:token
                }
                }).then(res=>{
                    const {message,statusCode,data} =res.data;
                    if(statusCode===200){
                        //this.$toast.success(message);  
                        this.userInfo=data;
                        console.log(this.userInfo);
                    }else{
                        this.$toast.fail(message);
                    }
                });
        }
    },
    filters:{
        password(input){
            return input.replace(/./g,'*');
        }
}
}
</script>

<style lang="less" scoped>
    .userEdit{
        .avatar{
            position: relative;
            img{
                width: 70px;
                height: 70px;
                display: block;
                border-radius: 50%;
                margin: 35px auto;
            }
            .uploader{
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0;
            }
        }
        .van-dialog{
            padding: 0 10px;
        }
        .van-field{
            border: 1px solid #ccc;
            margin: 10px 0;
        }
    }
</style>