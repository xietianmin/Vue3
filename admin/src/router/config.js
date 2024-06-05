import Home from "../views/home/Home.vue"
import Center from "../views/center/Center.vue"
import UserAdd from "../views/user_manage/UserAdd.vue"
import UserList from "../views/user_manage/UserList.vue"
import NewsAdd from "../views/news_manage/NewsAdd.vue"
import NewsList from "../views/news_manage/NewsList.vue"
import NewsEdit from "../views/news_manage/NewsEdit.vue"
import ProductAdd from "../views/product_manage/ProductAdd.vue"
import ProductList from "../views/product_manage/ProductList.vue"
import ProductEdit from "../views/product_manage/ProductEdit.vue"
import NotFound from "../views/notfound/NotFound.vue"
const routes=[
    {
        path:"/index",
        component:Home,
    },
    {
        path:'/center',
        component:Center,
    },
    {
        path:"/user_manage/adduser",
        component:UserAdd,
        requireAdmin:true,
    },
    {
        path:'/user_manage/userlist',
        component:UserList,
        requireAdmin:true,
    },
    {
        path:"/news_manage/addnews",
        component:NewsAdd,
    },
    {
        path:'/news_manage/newslist',
        component:NewsList,
    },
    {
        path:'/news_manage/editnews/:id',
        component:NewsEdit,
    },
    {
        path:"/product_manage/addproduct",
        component:ProductAdd,
    },
    {
        path:'/product_manage/productlist',
        component:ProductList,
    },
    {
        path:'/product_manage/editproduct/:id',
        component:ProductEdit,
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"NotFound",
        component:NotFound
    }

]
export default routes