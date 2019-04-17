<template>
    <div class="goods_list">
        <!--<router-link  tag="div" class="goods_item" v-for="item in list" :key="item.id" :to="'/home/goodInfo/' + item.id">-->
        <!--<img :src="item.img_url" alt="">-->
        <!--<h2 class="title">{{item.title}}</h2>-->
        <!--<div class="info">-->
        <!--<p class="price">-->
        <!--<span class="now">¥{{item.sell_price}}</span>-->
        <!--<span class="old">¥{{item.market_price}}</span>-->
        <!--</p>-->
        <!--<p class="sell">-->
        <!--<span>热卖中</span>-->
        <!--<span>剩余{{item.stock_quantity}}件</span>-->
        <!--</p>-->
        <!--</div>-->
        <!--</router-link>-->
        <div @click="goDetail(item.id)" class="goods_item" v-for="item in list" :key="item.id" >
            <img :src="item.img_url" alt="">
            <h2 class="title">{{item.title}}</h2>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "goodList",
        data() {
            return {
                list: [],
                pageindex: 1,
            }
        },
        methods: {
            getGoodsList() {
                this.$http.get('api/getgoods?pageindex=' + this.pageindex)
                    .then((result) => {

                        if (result.body.status === 0) {
                            this.list = this.list.concat(result.body.message)
                        }
                    })
            },
            getMore() {
                this.pageindex++
                this.getGoodsList()
            },
            //使用js跳转路由
            goDetail(id){
                //this.$route  :路由的参数对象
                //this.$router  :路由的导航对象,用它可以很方便的使用js代码,实现前进后退,跳转到新的URL地址
                //1.最简单的方法
                //this.$router.push('/home/goodInfo/'+id)
                //2.传递对象
                //this.$router.push({path:'/home/goodInfo/'+id})
                //3.传递匿名的路由
                this.$router.push({name:'goodInfo',params:{id:id}})
            }
        },
        created() {
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="scss">
    .goods_list {
        display: flex;
        /*两端对齐*/
        justify-content: space-between;
        /*让子元素在必要时拆行*/
        flex-wrap: wrap;
        padding: 8px;
        .goods_item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
            margin: 5px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
            }
            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                    .now {
                        color: red;
                        font-weight: bolder;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 15px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }

</style>