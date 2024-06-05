<template>
<div>
  <el-carousel 
  height="calc(100vh - 59px)" 
  direction="vertical" 
  :autoplay="false"
  v-if="loopList.length">
    <el-carousel-item v-for="item in loopList" :key="item._id">
        <div class="item" :style="{
          backgroundImage:`url(http://localhost:3000${item.cover})`
        }">
          <el-card style="max-width: 100%" class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{item.title}}</h2>
              </div>
            </template>
            <div>{{item.introduction}}</div>
            <div class="detail">{{item.detail}}</div>
            <div class="more">
              更多信息，请访问官网
            </div>
          </el-card>
        </div>
    </el-carousel-item>
  </el-carousel>
  <el-empty description="暂无展示产品" v-else></el-empty>
</div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue'

const loopList=ref([]);
onMounted(async()=>{
const res = await axios.get('/webapi/product/list');
loopList.value=res.data.data;
})

</script>

<style scoped lang="scss">
 .item{
  width: 100%;
  height: 100%;
  background-image: cover ;
 }
 .box-card{
  width:50%;
  height: 100%;
  background-color: rgba(255,255,255,0.3);
  .detail,.more{
  margin-top: 20px;
 }
 }
 
</style>