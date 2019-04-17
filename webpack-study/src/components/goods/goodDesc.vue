<template>
    <div class="goodsdesc_container">
        <h3>{{list.title}}</h3>
        <hr>
        <div class="content" v-html="list.content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodDesc",
        data(){
            return{
                list:{}
            }
        },
        methods:{
            getList(){
                this.$http.get('api/goods/getdesc/'+this.$route.params.id)
                    .then(result=>{

                        if (result.body.status === 0) {
                            this.list =result.body.message[0]
                        }
                        console.log(this.list);
                    })
            }
        },
        created(){
           this.getList()
        }
    }
</script>

<style scoped lang="scss">
    .goodsdesc-container {
        padding: 4px;
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100% !important;
            }
        }
    }

</style>