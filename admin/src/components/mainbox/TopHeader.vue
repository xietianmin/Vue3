<template>

    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed"><Menu/></el-icon>
            <span style="margin-left:10px">企业门户网站管理系统</span>
        </div>
        <div class="right">
             <span>欢迎回来,{{store.state.userInfo.UserName}}</span>
             <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="25" color="white">
                      <User/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                      <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
import { useStore } from 'vuex'
import { Menu,User} from "@element-plus/icons-vue"
import { useRouter } from 'vue-router'

export default{
    name:"TopHeader",
    components:{Menu,User},
    setup(){
      const store=useStore();
      const router=useRouter();
      const handleCollapsed=()=>{
        store.commit("changeCollased");
      }
      const handleCenter=()=>{
         router.push({path:"/center"})
         
      }
      const handleLogout=()=>{
        localStorage.removeItem("token");
        store.commit("clearUserInfo");
        router.push({path:"/login"}) ;
      }
      return{
        handleCollapsed,
        handleCenter,
        handleLogout,
        store,
      }
    }
}
</script>

<style lang="scss" scoped>
.el-header{
  background:#2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,.right{
    display: flex ;
}
.left{
  i{
    margin:auto;
    cursor: pointer;
  }
}
.right{
  .el-dropdown{
    margin:auto;
  }
}

</style>