//由于webpack基于node构建 所以在配置文件时 任何合法的node代码都是支持的
//1.导入路径模块
const path = require('path');

//导入在内存中生成html页面的插件
//这个插件的两个作用,自动在内存中根据指定页面生成一个内存页面
const htmlWebpackPlugin = require('html-webpack-plugin');

//通过node中的模块操作 向外暴露一个配置对象
module.exports = {
    //配置打包的默认为开发模式
    mode:'development',
    //配置入口路径:要打包的文件
    entry:path.join(__dirname,'./src/index.js'),
    //配置出口路径:指定打包好的文件
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'main.js'
    },
    plugins:[
        //创建一个在内存中生成html的插件
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    //配置第三方模块
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的转化
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//处理css文件的转化
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},//处理css文件的转化
            {test:/\.png$/,use:'url-loader?limit=12,264&name=[hash:8][name].[ext]'},//处理css文件的转化
            //为了防止图片重名被覆盖,再加一个hash值&name=[hash:8][name].[ext]
            //hash值相当于DNA , 能保证两个数据的hash值是不可能相同的,最多32位
            {test:/\.(ttf|eot|woff|svg|woff2)$/,use:'url-loader'},
            //注意①:在配置的时候,必须要把node_modules目录排除在外
                    //原因:不排除的话 babel会把node-modules所有的js文件全部都打包编译,会非常消耗电脑的cpu,速度特别慢
            //注意②:在项目的根目录中,新建.babelrc文件,这个文件相当于json文件,配置相关的babel参数

            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:'vue-loader'},

        ],

    },
    //配置修改路径
    resolve:{
        //修改vue被导入时的路径
        alias:{
            'vue$':"vue/dist/vue.js"
        }
    }
}