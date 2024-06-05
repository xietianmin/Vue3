<template>
  <div>
      <el-page-header  title="新闻管理" @back="handleBack()">
        <template #content>
        <span class="text-large font-600 mr-3">编辑新闻</span>
        </template>
      </el-page-header>

      <el-form
        ref="newsFormRef"
        :model="newsForm"
        :rules="newsFormRules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
             <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content"></editor>
        </el-form-item>
        
      <el-form-item label="类别" prop="category">
          <el-select
              v-model="newsForm.category"
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

        <el-form-item label="封面" prop="cover">
            <Upload :Avatar= "newsForm.cover" @changed="handleUploadChange" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="SubmitForm()" >
              更新新闻
          </el-button>
      </el-form-item>
      
      </el-form>

  </div>
</template>

<script setup>
import { ref,reactive,onMounted } from "vue"
import editor from "@/components/editor/Editor.vue" 
import Upload from '../../components/upload/Upload.vue'
import upload from '@/util/upload.js'
import { useRouter,useRoute } from "vue-router" 
import axios from 'axios'
const router=useRouter();
const route=useRoute();
const newsFormRef=ref();
const newsForm=reactive({
  title:"",
  content:"",
  category:1,
  cover:"",
  file:null,
  isPublish:0
});
const newsFormRules=reactive({
  title:[{required:true,message:"新闻标题为必填项",trigger:"blur"}],
  content:[{required:true,message:"内容不可为空",trigger:"blur"}],
  cover:[{required:true,message:"缺少封面图片",trigger:"blur"}],
});
const handleChange=(data)=>{
  newsForm.content=data;
};
const handleUploadChange=(file)=>{
  newsForm.cover=URL.createObjectURL(file);
  newsForm.file=file;
}
const options=[
  {
  label:"最新动态",
  value:1
  },
  {
    label:"典型案例",
    value:2
  },
  {
    label:"通知公告",
    value:3
  },
];
const SubmitForm=()=>{
        newsFormRef.value.validate(async valid=>{
            if(valid){
                await upload("/adminapi/news/list",newsForm)
                router.back()
            }
        })
};
const handleBack=()=>{
    router.back();
};
onMounted( async ()=>{
    const res=await axios.get(`/adminapi/news/list/${route.params.id}`);
    Object.assign(newsForm,res.data.data[0]);
})
</script>

<style lang="scss" scoped>
.el-form{
  margin-top:50px;
}
</style>