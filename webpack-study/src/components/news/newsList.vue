<template>
    <div>
        <!--图文列表-->
        <ul class="mui-table-view">
            <li data-v-ac12f38c="" v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media"><router-link data-v-ac12f38c="" :to="'/home/newsInfo/'+item.id"
                                                                            class=""><img data-v-ac12f38c=""
                                                                                          :src="item.img_url"
                                                                                          class="mui-media-object mui-pull-left">
                <div data-v-ac12f38c="" class="mui-media-body"><h2 data-v-ac12f38c="" style="font-size: 15px;">{{item.title}}</h2>
                    <p data-v-ac12f38c="" class="mui-ellipsis" style="font-size: 12px;
    color: #226aff;"><span data-v-ac12f38c="" >发表时间: {{item.add_time | dateFormat('YYYY-MM-DD')}}</span> <span
                            data-v-ac12f38c="" style="float: right">点击次数:{{item.click}}</span></p></div>
            </router-link></li>

        </ul>

    </div>
</template>

<script>

    export default {
        name: "newsList",
        data(){
            return{
                list:[]
            }
        },
        methods:{
            getList(){
                //获取表单数据
                this.$http.get('api/getnewslist')
                    .then(result=>{
                        if (result.body.status===0){
                            this.list=result.body.message
                        }

                    })
            },
        },
        created(){
            this.getList();
        }
    }

</script>

<style scoped>

</style>