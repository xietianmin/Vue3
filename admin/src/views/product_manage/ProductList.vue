<template>
  <div>
    <el-card>
        <el-page-header :icon="null" title="产品管理">
          <template #content>
          <span class="text-large font-600 mr-3">产品列表</span>
          </template>
        </el-page-header>

         <el-table :data="tableData" style="width: 100%;height:100%" stripe="true" border="true">
            <el-table-column prop="title" label="产品名称"  />
            <el-table-column prop="introduction" label="简要描述"  />

            <el-table-column prop="time" label="最后修改时间" >
                <template #default="scope">
                   {{formatTime.getTime(scope.row.editTime)}}
                </template>
            </el-table-column>

            <el-table-column label="Operations">
                <template #default="scope">
                 
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
    
  </div>
</template>

<script setup>
import { ref,onMounted, } from 'vue'
import axios  from "axios"
import formatTime from "@/util/timeFormat.js"
import { Edit,Delete} from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

const tableData=ref([]);
const router=useRouter();

const getTableData = async()=>{
    const res= await axios.get("/adminapi/product/list")
    tableData.value=res.data.data;
};
onMounted(()=>{
  getTableData();
  }) ;


const handleDelete= async (item)=>{
    await axios.delete(`/adminapi/product/list/${item._id}`);
    await getTableData();
}
const handleEdit=(item)=>{
    router.push(`/product_manage/editproduct/${item._id}`)
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
