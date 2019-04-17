//1.导入vue
import Vue from 'vue'
//导入公共组件
import app from './app.vue'
//导入路由
import router from './router.js'
//导入mui 模块
import './lib/mui/css/mui.min.css'
//导入mui扩展图标
import './lib/mui/css/icons-extra.css'
//导入mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.min.css'
//导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
//全局配置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//全局配置post请求时表单数据的格式为普通表单格式
Vue.http.options.emulateJSON =true;
//导入时间插件
import moment from 'moment'
//  ① 需要格式化的时间, ②时间的格式
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import './app.scss'

let vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router
})