<template>
<div>
    <el-page-header :icon="null" title="企业门户网站管理系统">
        <template #content>
        <span class="text-large font-600 mr-3">首页</span>
        </template>
    </el-page-header>
    
    <el-card class="box-card">
        <el-row>
            <el-col :span=4>
                <el-avatar :size="100" :src="AvatarUrl" />
            </el-col>

            <el-col :span=20>
                <h3 style="line-height:200px">
                    欢迎回来，{{UserName}},{{welcomeText}}.
                </h3>
            </el-col>
        </el-row>
    </el-card>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司产品</span>
            </div>
        </template>
       
        <el-carousel :interval="3000" type="card" height="200px" v-if="loopList.length">
            <el-carousel-item v-for="item in loopList" :key="item._id" loop="false">
            <div :style="{
                backgroundImage:`url(http://localhost:3000${item.cover})`,   
            }">
                <h3>{{item.title}}</h3>
            </div>
            </el-carousel-item>
        </el-carousel> 

    </el-card>
</div>
</template>
<script setup>
import axios from 'axios';
import 'element-plus/dist/index.css'
import { computed,onMounted,ref } from "vue"
import { useStore } from 'vuex'

    const store=useStore();
    const loopList=ref([])
    const { UserName,Avatar }=store.state.userInfo;
    const AvatarUrl=computed(()=>{
    return Avatar
           ?'http://localhost:3000'+Avatar
           :'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    });

    const welcomeText=computed(()=>new Date().getHours()<12
    ?"今天也要开心呀"
    :"今天又是开心的一天");

    const getTableData = async()=>{
        const res= await axios.get("/adminapi/product/list")
        loopList.value=res.data.data;
    };
    onMounted(()=>{
    getTableData();
    }) ;

</script>

<style lang="scss" scoped>
    .box-card{
        margin-top:50px;
    }
    .el-carousel__item h3 {
    color: rgba(58, 154, 143, 0.638);
    opacity: 0.75;
    line-height: 200px;
    font-size: 50px;
    margin: 0;
    text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
    }
</style>