import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../views/Login.vue"
import MainBox from "../views/MainBox.vue"
import RoutesConfig from './config'
import store from '@/store/index'
const routes = [
  {
    path:'/login',
    name:"login",
    component:Login,    
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox,
    children:[],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const ConfigRouter=()=>{
  if(!router.hasRoute("mainbox")){
        router.addRoute({
          path:"/mainbox",
          name:"mainbox",
          component:MainBox,
          children:[],
        })
  }
  RoutesConfig.forEach(item=>{
  checkPermission(item) && router.addRoute("mainbox",item);
})
  store.commit("changeGetterRouter",true);
}

router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next();
  }else{
    if(!localStorage.getItem("token")){
      next({
        path:"/login",
      })
    }
    else{
      if(!store.state.isGetterRouter){
        router.removeRoute("mainbox");
        ConfigRouter();
        next({
          path:to.fullPath,
        });
      }else {next();} 
    }
  }
})
const checkPermission= item=>{
  if(item.requireAdmin){
     return store.state.userInfo.Role===1 ;
  }
  return true;
}
export default router
