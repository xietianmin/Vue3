<template>
    <div>

      <el-card>
        <el-page-header :icon="null" title="用户管理">
          <template #content>
          <span class="text-large font-600 mr-3">用户列表</span>
          </template>
        </el-page-header>
        <el-table :data="tableData" style="width: 100%;height:100%" stripe="true" border="true">
            <el-table-column prop="UserName" label="用户名"  />

            <el-table-column  label="头像" >
                <template #default="scope">
                    <div v-if="scope.row.Avatar">
                      <el-avatar 
                      :size="50" 
                      :src="'http://localhost:3000'+scope.row.Avatar"
                      />
                    </div>
                    <div v-else>
                      <el-avatar 
                      :size="50" 
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      />
                    </div>
                </template>
            </el-table-column>

            <el-table-column  label="职位" >
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.Role===1">管理员</el-tag>
                    <el-tag type="danger" v-else>编辑</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Operations">
                <template #default="scope">
                  <el-button  @click="handleEdit(scope.row)">
                    Edit
                  </el-button>

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
                        <el-button
                          type="danger"
                        >
                          Delete
                        </el-button>
                    </template>
                  </el-popconfirm>

                </template>
            </el-table-column>

        </el-table>
      </el-card>

        <el-dialog
          v-model="dialogVisible"
          title="编辑用户信息"
          width="500"
        >
            <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="UserName">
                    <el-input v-model="userForm.UserName" />
                </el-form-item>
                
                <el-form-item label="密码" prop="PassWord" >
                    <el-input v-model="userForm.PassWord"  />
                </el-form-item>

                <el-form-item label="职位" prop="Role">
                    <el-select
                        v-model="userForm.Role"
                        placeholder="Select"
                        size="large"
                        style="width:100%"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="简介" prop="Introduction">
                    <el-input v-model="userForm.Introduction" type="textarea" />
                </el-form-item>

          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleEditConfirm()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
    </div>
</template>
<script>
import { onMounted, ref,reactive } from 'vue'
import axios from "axios"
import { InfoFilled } from '@element-plus/icons-vue'
  export default {
    name:"UserList",
    components:{ InfoFilled },
    setup(){
       const dialogVisible=ref(false);
       const tableData=ref([]);
       const userFormRef = ref();
       const userForm=reactive({
        UserName:"",
        PassWord:"",
        Role:2,
        Introduction:"",
    });
      const userFormRules=reactive({
        UserName: [
            { required: true, message: '用户名为必填项', trigger: 'blur' },
        ],
        PassWord: [
            { required: true, message: '密码为必填项', trigger: 'blur' },
        ],
        Role: [
            { required: true, message: '请选择用户身份', trigger: 'blur' },
        ],
  });
      const options=[
        {
            label:"管理员",
            value:1,
        },
        {
            label:"编辑",
            value:2,
        },
    ];
       onMounted(()=>{
        getTableData();
       }) 
       const getTableData= async()=>{
         const res=await axios.get("/adminapi/user/list");
         tableData.value= res.data.data;
       };
       const handleEdit= async data=>{
          const res=await axios.get(`/adminapi/user/list/${data._id}`);
          Object.assign(userForm,res.data.data[0]);
          dialogVisible.value=true;

       };
       const handleDelete=async data =>{
          const result=await axios.delete(`/adminapi/user/list/${data._id}`)
          if(result.data.ActionType==="OK"){
            getTableData();
          }
       };
       const handleEditConfirm= () =>{
            userFormRef.value.validate(async valid =>{
                if(valid){
                  await axios.put(`/adminapi/user/list/${userForm._id}`,userForm);
                  dialogVisible.value=false;
                  getTableData();
                }
            })
       }
       return{
          tableData,
          handleDelete,
          handleEdit,
          dialogVisible,
          userFormRef,
          userForm,
          userFormRules,
          options,
          handleEditConfirm
       }
     }
}
</script>
<style lang="scss" scoped>
  .el-table{
    margin-top: 30px;
  }
</style>