import Vue from 'vue'
//1.导入路由模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//2.导入对应的路由组件
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import ShopCar from './components/tabbar/shopcar.vue'
import Search from './components/tabbar/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photoList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import GoodList from './components/goods/goodList.vue'
import GoodInfo from './components/goods/goodInfo.vue'
import GoodDesc from './components/goods/goodDesc.vue'
import GoodComment from './components/goods/goodComment.vue'

//3.创建路由对象
let router =new VueRouter({
    //设置路由的高亮显示
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcar',component:ShopCar},
        {path:'/search',component:Search},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/goodList',component:GoodList},
        {path:'/home/goodInfo/:id',component:GoodInfo,name:'goodInfo'},
        {path:'/home/goodDesc/:id',component:GoodDesc,name:'goodDesc'},
        {path:'/home/goodComment/:id',component:GoodComment,name:'goodComment'},
    ]
})

//4.把路由对象暴露出去
export default router