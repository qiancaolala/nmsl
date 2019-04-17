<template>
    <div class="photoInfo_container">
        <h4 class="title">{{Xq.title}}</h4>
        <p class="subTitle">
            <span>发表时间：{{Xq.add_time| dateFormat}}</span>
            <span>点击次数：{{Xq.click}}次</span>
        </p>
        <hr>

        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>

        <!--图片内容区域-->
        <div v-html="Xq.content" class="nr"></div>

        <!--评论子组件区域-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //1.导入子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "photoInfo",
        data(){
            return{
                id:this.$route.params.id,
                list:[],//存放缩略图
                Xq:[],
            }
        },
        components:{
            comment
        },
        methods:{
            //获取缩略图的方法
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id)
                    .then(result=>{
                        if (result.body.status===0){
                            //遍历的补全图片的宽高小图
                            result.body.message.forEach(item=>{
                                ///设置每条数据的小图，宽高
                                item.msrc=item.src;
                                item.w=600;
                                item.h=400;
                            })
                            this.list=result.body.message;
                        }
                    })
            },
            getXq(){
                this.$http.get('api/getimageInfo/'+this.id)
                    .then(result=>{
                        if (result.body.status===0){
                            this.Xq=result.body.message[0]
                        }
                    })
            }
        },
        created(){
            this.getThumbs()
            this.getXq()
        }
    }
</script>

<style scoped lang="less">
    .photoInfo_container{
        padding:0px 5px;
        .title{
            font-size: 14px;
            text-align: center;
            color:dodgerblue;
            margin: 14px 0;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color:#ccc;
            font-size: 12px;
        }
        .nr{
            font-size: 13px;
        }
    }
</style>
