<template>
    <div  class="newsInfo_container">
        <h4 class="title">{{newsinfo.title}}</h4>
        <p class="subTitle">
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数: {{newsinfo.click}}次</span>
        </p>
        <hr>

        <!--内容区域-->
        <div v-html="newsinfo.content">

        </div>

        <!--评论区域-->
        <!--3.调用子组件-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //1.导入子组件
    import comment from "../subcomponents/comment.vue";
    export default {
        name: "newsInfo",
        components:{
            //定义子组件
            comment,
        },
        data(){
            return{
                id: this.$route.params.id,
                newsinfo:{}
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id)
                    .then(result=>{
                        if (result.body.status===0){
                            this.newsinfo=result.body.message[0]

                        }
                    })
            }
        },

    }
</script>

<style scoped lang="scss">
    .newsInfo_container{
        padding: 0px 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color: red;
            margin: 15px 0;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color: blue;
            font-size: 14px;
        }
    }
</style>