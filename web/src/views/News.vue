<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage:`url(${require('@/assets/news.jpg')})`
        }">
        </div>
        <div class=search>
            <el-popover
                placement="bottom"
                title="搜索结果"
                :width="200"
                :visible="visible"
            >
                <template #reference>
                    <el-input
                    v-model="searchText"
                    style="width: 50%"
                    placeholder="搜索"
                    :prefix-icon="Search"
                    type="search"
                    size="large"
                    @input="visible=true"
                    @blur="visible=false"
                    />
                </template>
                <div v-if="searchnewslist.length">
                     <div v-for="data in searchnewslist" 
                     :key="data._id" 
                     class="search-item"
                     @click="handleChangePage(data._id)">
                         {{data.title}}
                     </div>
                </div>
                <div v-else>
                       <el-empty description="暂无相关内容" :image-size="50"></el-empty>
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <el-card style="max-width: 480px" shallow="hover" @click="handleChangePage(item_id)">
                        <div class="image" :style="{
                            backgroundImage:`url(http://localhost:3000${item.cover})`
                        }">
                        </div>
                        <div style="{padding:14px;margin-top:20px;}">
                            <span>{{item.title}}</span>
                        </div>
                        <template #footer >
                            <div class="time"> {{whichTime(item.editTime)}} </div>
                        </template>

                    </el-card>

                </el-col>
            </el-row>
        </div>
        <el-tabs
            v-model="whichTab"
            type="card"
            class="demo-tabs"
            style= "margin:20px"
        >
            <el-tab-pane 
            v-for="item in tabList"
            :label="item.label "
            :name="item.name"
            :key="item.name"
            >
                
                <el-row :gutter="20">
                    <el-col :span="20" >
                        <div v-for="data in tabnews[item.name]" :key="data._id" >
                        <el-card style="max-width: 100%;" shallow="hover" @click="handleChangePage(data._id)">
                            <div class="tab_image" :style="{
                                backgroundImage:`url(http://localhost:3000${data.cover})`,
                            }">
                            </div>
                            <div style="{padding:14px;margin:20px;float:left;}">
                                <span>{{data.title}}</span>
                                <div class="tab_time"> {{whichTime(data.editTime)}} </div>
                            </div>
                        </el-card>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-timeline >
                            <el-timeline-item
                                v-for="(data, index) in tabnews[item.name]"
                                :key="index"
                                :timestamp="whichTime(data.editTime)"
                            >
                                {{ data.title }}
                                </el-timeline-item>
                        </el-timeline>
                    </el-col>
                    </el-row>
            </el-tab-pane>
        </el-tabs>
             <el-backtop :right="50" :bottom="80" />
    </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue'
import { Search } from "@element-plus/icons-vue"
import { useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

moment.locale("zh-cn");
const searchText=ref('');
const visible=ref(false);
const newsList=ref([]);
const whichTab=ref("first");
const router=useRouter();

onMounted(async()=>{
    var res=await axios.get("/webapi/news/list");
    newsList.value=res.data.data
});
const searchnewslist=computed(
    ()=>newsList.value.filter(item=>item.title.includes(searchText.value))
    )
const topNewsList=computed(()=>newsList.value.slice(0,4))
const whichTime= time =>{
     return moment(time).format("lll");
}
const tabList=[
    {
      label:"最新动态",
      name:1
    },
    {
      label:"典型案例",
      name:2
    },
    {
      label:"通知公告",
      name:3
    },
];
const tabnews=computed(
    ()=>_.groupBy(newsList.value,item=>item.category)
);
const handleChangePage= id =>{
    router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
   .container{
       position: relative;
   }
   .news-header{
    width: 100%;
    height: 400px;
    background-size: cover;
   }
   .search{
    position: absolute;
    top:300px;
    width:100%;
    text-align: center;
   }
   .search-item{
    height: 50px;
    line-height: 50px;
     &:hover{
        background:whitesmoke;
        color: red;
     }
   }
   .topnews{
    margin: 20px;
    text-align: center;
    .image{
        width:100%;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center center
        // background-size: cover;
    }
    .time{
        font-size: 13px;
        color:gray;
    }
   }
   .tab_image{
        width: 200px;
        height:200px;
        background-repeat: no-repeat;
        float: left;
   }
   .tab_time{
        font-size: 13px;
        color:gray;
   }
  
</style>