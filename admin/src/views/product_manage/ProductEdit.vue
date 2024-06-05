<template>
  <div>
      <el-page-header @back="handBack()" title="产品管理">
        <template #content>
        <span class="text-large font-600 mr-3">编辑产品</span>
        </template>
      </el-page-header>
    <el-form
        ref="productFormRef"
        :model="productForm"
        :rules="productFormRules"
        label-width="auto"
        class="demo-ruleForm"
    >
      <el-form-item label="产品名称" prop="title">
          <el-input v-model="productForm.title" />
      </el-form-item>

      <el-form-item label="产品简介" prop="introduction">
          <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="产品详细介绍" prop="detail">
          <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>

      <el-form-item label="产品图片" prop="cover">
          <Upload :Avatar= "productForm.cover" @changed="handleChange" />
      </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="SubmitForm()" >
              确认添加产品
          </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup>
import { ref,reactive,onMounted } from "vue"
import Upload from '../../components/upload/Upload.vue'
import upload from '@/util/upload.js'
import { useRouter,useRoute } from "vue-router"
import axios from "axios"

    const productFormRef = ref();
    const router=useRouter();
    const route=useRoute();
    const productForm=reactive({
        title:"",
        introduction:"",
        detail:"",
        cover:"",
        file:null,
    });
    const productFormRules=reactive({
        title: [
            { required: true, message: '标题为必填项', trigger: 'blur' },
        ],
       introduction: [
            { required: true, message: '简介为必填项', trigger: 'blur' },
        ],
       detail: [
            { required: true, message: '请输入产品详细描述', trigger: 'blur' },
        ],
        cover: [
            { required: true, message: '请上传产品图片', trigger: 'blur' },
        ],
    });
  
    const handleChange=(file)=>{
        productForm.cover=URL.createObjectURL(file);
        productForm.file=file;
    };
    const handleBack=()=>{
        router.back()
    }
    const SubmitForm=()=>{
        productFormRef.value.validate(async valid=>{
            if(valid){
               await upload("/adminapi/product/list",productForm)
               router.push('/product_manage/productlist')
            }
        })
  };
  const getTableData= async()=>{
        const result=axios.get(`/adminapi/product/list/${route.params.id}`);
        Object.assign(productForm,result.data.data[0]);
  }
  onMounted=()=>{
    getTableData();
  }

</script>

<style lang="scss" scoped>

  .demo-ruleForm{
      margin-top: 50px;
  }
</style>