<template>
    <div>
        <el-page-header :icon="null" title="企业门户网站管理系统">
            <template #content>
            <span class="text-large font-600 mr-3">个人中心</span>
            </template>
        </el-page-header>

        <el-row :gutter="20" class="el-row">
            <el-col :span=8>
                <el-card class="box-card">
                    <el-avatar :size="100" :src="AvatarUrl" />
                    <h3>{{store.state.userInfo.UserName}}</h3>
                    <h5>{{store.state.userInfo.Role===1?"管理员":"编辑"}}</h5>
                </el-card>
            </el-col>

            <el-col :span=16>
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
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

                       <el-form-item label="性别" prop="Gender">
                            <el-select
                                v-model="userForm.Gender"
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
                                提交修改
                            </el-button>
                        </el-form-item>
            
                    </el-form>
                    
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { computed,ref,reactive } from "vue"
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload.js'
import Upload from '../../components/upload/Upload.vue'

export default{
  name:"Center",
  components:{Upload},
  setup(){
    const store=useStore();
    const userFormRef=ref();
    const { UserName,Gender,Introduction,Avatar }=store.state.userInfo;
    const userForm=reactive({
        UserName,
        Gender,
        Introduction,
        Avatar,
        File:null,
    });
    const AvatarUrl=computed(()=>{
        return store.state.userInfo.Avatar
        ?'http://localhost:3000'+store.state.userInfo.Avatar
        :'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
       
    })
    const userFormRules=reactive({
        UserName: [
            { required: true, message: '用户名为必填项', trigger: 'blur' },
        ],
        Gender: [
            { required: true, message: '性别', trigger: 'blur' },
        ],
       Introduction: [
            { required: true, message: '请输入个人简介', trigger: 'blur' },
        ],
        Avatar: [
            { required: true, message: '请选择合适的图片作为您的头像', trigger: 'blur' },
        ],
    });
    const options=[
        {
            label:"暂不公开",
            value:0,
        },
        {
            label:"男",
            value:1,
        },
        {
            label:"女",
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
                const res= await upload("/adminapi/user/upload",userForm);
                if(res.ActionType==="OK"){
                    store.commit("changeUserInfo",res.data);
                    ElMessage.success("更新成功");
                }
            }
        })
    };
    return{ 
        AvatarUrl,
        store,
        userFormRef,
        userForm,
        userFormRules,
        options,
        handleChange,
        SubmitForm,
        // uploadAvatar,
    }
 }
}
</script>

<style lang="scss" scoped>

    .el-row{
         margin-top:20px;
        .box-card{
           text-align: center;
        }
    }
    ::v-deep .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    ::v-deep .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    ::v-deep .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
    .avatar{
        width: 178px;
        height: 178px;
    }
</style>