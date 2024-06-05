<template>
    <div>
         <vue-particles
            id="tsparticles"
            :particlesLoaded="particlesLoaded"
            :options=options
        />
         <div class="FormContainer">
            <h3>企业门户网站管理系统</h3>
            <el-form
                ref="LoginFormRef"
                style="max-width: 600px"
                :model="LoginForm"
                status-icon
                :rules="LoginRules"
                label-width="auto"
                class="LoginForm"
            >
                <el-form-item label="用户名" prop="UserName">
                    <el-input v-model="LoginForm.UserName" type="string" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密码" prop="PassWord">
                    <el-input v-model="LoginForm.PassWord" type="password" autocomplete="off" />
                </el-form-item>
        
                <el-form-item>
                    <el-button type="primary" @click="Login" class="btn">
                        Login
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive ,ref } from "vue"
import {useRouter} from "vue-router"
import 'element-plus/dist/index.css'
import axios from "axios"
import { useStore } from "vuex"
import { ElMessage } from "element-plus"
 export default {
    name:"Login",
    setup(){
    const router=useRouter();
    const store=useStore();
    const options={
                    background: {
                        color: {
                            value: '#2d3a4b'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 6,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 }
                        }
                    },
                    detectRetina: true
                };
    const LoginForm=reactive({
       UserName:"",
       PassWord:"",
    });
    const LoginFormRef= ref();
    const LoginRules=reactive({
        UserName:[{
            required:true,
            message:"请输入用户名",
            trigger:"blur",
        }],
        PassWord:[{
            required:true,
            message:"请输入密码",
            trigger:"blur",
        },]
    });
    const Login=()=>{
         LoginFormRef.value.validate((valid)=>{
            if(valid){
                axios.post("/adminapi/user/login",LoginForm).then(res=>{
                    if(res.data.ActionType==="OK"){
                        store.commit("changeUserInfo",res.data.data);
                        store.commit("changeGetterRouter",false);
                        router.push("/index");
                    }
                    else {
                       ElMessage.error("未找到对应用户或密码不匹配");
                    }
                })
               
            }
         })
    }
    return {
        options,
        LoginForm,
        LoginFormRef,
        LoginRules,
        Login,
    }
  },
}
</script>

<style lang="scss"scoped>
    .FormContainer{
       width: 500px;
       height: 300px;
       position: fixed;
       left: 50%;
       top: 50%;
       transform:translate(-50%,-50%);
       background: rgba($color:#000000,$alpha:0.4);
       color: white;
       text-align: center; 
       padding: 20px;

       h3{
        font-size: 30px;
       }
       .LoginForm{
        margin-top: 30px ;
       }
       .btn{
        display: block;
        margin: auto;
       }

    }
    ::v-deep .el-form-item__label{
        color: white;
    }
</style>