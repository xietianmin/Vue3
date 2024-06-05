<template>
  <div>
      <el-page-header :icon="null" title="用户管理">
        <template #content>
        <span class="text-large font-600 mr-3">添加用户</span>
        </template>
      </el-page-header>
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
          <el-input v-model="userForm.PassWord" type="password" />
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

      <el-form-item label="头像" prop="Avatar">
          <Upload :Avatar= "userForm.Avatar" @changed="handleChange" />
      </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="SubmitForm()" >
              确认添加用户
          </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { ref,reactive } from "vue"
import Upload from '../../components/upload/Upload.vue'
import upload from '@/util/upload.js'
import { useRouter } from "vue-router"
export default {
  name:"UserAdd",
  components:{Upload},
  setup() {
    const userFormRef = ref();
    const router=useRouter();
    const userForm=reactive({
        UserName:"",
        PassWord:"",
        Role:2,
        Introduction:"",
        Avatar:"",
        Gender:0,
        File:null,
    });
    const userFormRules=reactive({
        UserName: [
            { required: true, message: '用户名为必填项', trigger: 'blur' },
        ],
        PassWord: [
            { required: true, message: '密码为必填项', trigger: 'blur' },
        ],
    //    Introduction: [
    //         { required: true, message: '请输入个人简介', trigger: 'blur' },
    //     ],
        // Avatar: [
        //     { required: true, message: '请选择合适的图片作为您的头像', trigger: 'blur' },
        // ],
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
    const handleChange=(file)=>{
        userForm.Avatar=URL.createObjectURL(file);
        userForm.File=file;
    }
    const SubmitForm=()=>{
        userFormRef.value.validate(async valid=>{
            if(valid){
               await upload("/adminapi/user/add",userForm)
               router.push('/user_manage/userlist')
            }
        })
  };
   return{
      userFormRef,
      userForm,
      userFormRules,
      options,
      handleChange,
      SubmitForm,
    }
  },
}
</script>

<style lang="scss" scoped>

  .demo-ruleForm{
      margin-top: 50px;
  }
</style>