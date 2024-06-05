<template>
    <el-row>
        <el-col :span="17" :offset="1">
              <div>
                   <h2>{{currentNews.title}}</h2>
                   <div class="time">
                        {{whichTime(currentNews.editTime)}}
                   </div>
                   <el-divider></el-divider>
                   <div v-html="currentNews.content"></div>
              </div>
        </el-col>
        <el-col :span="4" offset="1" :pull="1">
            <el-card style="max-width: 480px">
                <template #header>
                <div class="card-header">
                    <span style="{font-size:16px;font-weight:bold}">近期热点</span>
                </div>
                </template>
                <div v-for="item in topNews" 
                :key="item._id" 
                class="text item"
                style="padding:14px"
                @click="handleChange(item._id)">
                    <span>{{item.title}}</span>
                    <div class="time"> {{whichTime(item.editTime)}} </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted,ref,watchEffect,onBeforeUnmount } from 'vue' 
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import moment from 'moment'

moment.locale("zh-cn");
const route=useRoute();
const router=useRouter()
const currentNews=ref({});
const topNews=ref([]);
const stop=watchEffect(async() =>{
    if(!route.params.id) return
    const res =await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 =await axios.get(`/webapi/news/toplist?limit=4`)
    currentNews.value=res.data.data[0];
    topNews.value=res2.data.data;
})
const whichTime= time =>{
     return moment(time).format("lll");
}
const handleChange=(id)=>{
     router.push(`/news/${id}`);
}
onBeforeUnmount(()=>{
    stop();
})
</script>

<style scoped lang="scss">
  .el-row{
    margin-top:30px;
  }
  .time{
    font-size: 13px;
    color: grey;
  }
</style>