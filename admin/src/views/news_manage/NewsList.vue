<template>
  <div>
    <el-card>
        <el-page-header :icon="null" title="新闻管理">
          <template #content>
          <span class="text-large font-600 mr-3">新闻列表</span>
          </template>
        </el-page-header>

         <el-table :data="tableData" style="width: 100%;height:100%" stripe="true" border="true">
            <el-table-column prop="title" label="标题"  />
            <el-table-column prop="category" label="类型" >
                <template #default="scope">
                   {{categoryFormat(scope.row.category)}}
                </template>
            </el-table-column>
            <el-table-column prop="time" label="最后修改时间" >
                <template #default="scope">
                   {{formatTime.getTime(scope.row.editTime)}}
                </template>
            </el-table-column>
            <el-table-column prop="isPublish" label="是否发布" >
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0" @change="handleSwitchChange(scope.row)"/>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #default="scope">
                  <el-button  circle :icon="View" size="small" type="info" @click="handlePreview(scope.row)"></el-button>
                  <el-button  circle :icon="Edit" size="small" type="success" @click="handleEdit(scope.row)"></el-button>
                  <el-popconfirm 
                    title="确定删除该用户?"
                    confirmButtonText="确认"
                    cancelButtonText="取消"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    width="200"
                    @confirm="handleDelete(scope.row)"
                   >
                    <template #reference>
                        <el-button  circle :icon="Delete" size="small" type="danger" ></el-button>  
                    </template>
                  </el-popconfirm>      
                </template>
            </el-table-column>
         </el-table>         
    </el-card>
    
        <el-dialog
          v-model="dialogVisible"
          title="预览新闻"
          width="500"
        >
          <div>
              <h2>{{previewData.title}}</h2>
              <div style="font-size:12px;color:gray;">
                {{formatTime.getTime(previewData.editTime)}}
              </div>
              <el-divider />
              <div v-html="previewData.content" class="htmlcontent"></div>
          </div>
        </el-dialog>
  </div>
</template>

<script setup>
import { ref,onMounted, } from 'vue'
import axios  from "axios"
import formatTime from "@/util/timeFormat.js"
import { View,Edit,Delete} from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

const tableData=ref([]);
const router=useRouter();
const previewData=ref({});
const dialogVisible=ref(false);
const getTableData = async()=>{
    const res= await axios.get("/adminapi/news/list")
    tableData.value=res.data.data;
};
onMounted(()=>{
  getTableData();
  }) ;
const categoryFormat=(category)=>{
    const arr=["最新动态","典型案例","通知公告"];
    return arr[category-1];
}
const handleSwitchChange= async(item)=>{
      await axios.put('/adminapi/news/publish',{
        _id:item._id,
        isPublish:item.isPublish,
      })
      await getTableData();
}
const handlePreview = (data)=>{
      previewData.value=data;
      dialogVisible.value=true;
}
const handleDelete= async (item)=>{
    await axios.delete(`/adminapi/news/list/${item._id}`);
    await getTableData();
}
const handleEdit=(item)=>{
    router.push(`/news_manage/editnews/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-table{
  margin-top: 50px;
}
::v-deep .htmlcontent{
  img{
    max-width: 100%;
  }
}
</style>
