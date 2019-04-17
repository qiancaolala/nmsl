<template>
    <div class="goodInfo_container">
        <!--小球-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div @transitionend="transitionend" class="ball" v-show="flag"></div>
        </transition>
        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="bannerList" :bol="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{list.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>{{list.market_price}}元</del>
                        销售价: <span class="nowPrice">{{list.sell_price}}元</span>
                    </p>
                    <p>
                        购买数量: 4个
                    </p>
                    <p>
                        <mt-button type="primary" size="small" >立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>

        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{list.goods_no}}/p>
                    <p>库存情况:{{list.stock_quantity}}</p>
                    <p>上架时间:{{list.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDetail(list.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(list.id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    export default {
        name: "goodInfo",
        components:{
          swiper
        },
        data(){
          return{
              id:this.$route.params.id,
              bannerList:[],
              list:{},
              flag:false,
              isShow:false,
          }
        },
        methods:{
            //1.获取轮播图数据
            getBanner(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        result.body.message.forEach(item=>{
                            item.img =item.src
                        })
                        this.bannerList =result.body.message
                    }
                })
            },
            getList(){
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if (result.body.status === 0){
                        result.body.message.forEach(item=>{
                            item.img =item.src
                        })
                        this.list =result.body.message[0]

                    }
                })
            },
            goDetail(id){
                this.$router.push({name:'goodDesc',params:{id:id}})
            },
            goComment(id){
                this.$router.push({name:'goodComment',params:{id:id}})
            },
            addCar(){
                this.flag=!this.flag
            },
            //6.设置小球的动画
            beforeEnter(el){

                if (this.isShow) return false
                this.isShow=true;
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;
                //解决因分辨率
                //获取小球的位置
                let ball=document.querySelector(".ball").getBoundingClientRect()
                //关于DOM元素和所在的组件没有任何关系
                //获取灰标的位置
                let badge=document.querySelector(".mui-badge").getBoundingClientRect()
                let x=badge.left-ball.left;
                let y=badge.top-ball.top;
                el.style.transform=`translate(${x}px,${y}px)`;
                //el.style.transform="translate(330px,440px)";
                el.style.transition='all 1s cubic-bezier(.4,-0.3,.89,.67)';
                done();
            },
            afterEnter(){
                this.flag=!this.flag
            },
            transitionend(){
                this.isShow=false;
            }
        },
        created(){
            this.getBanner()
            this.getList()
        }
    }
</script>

<style scoped lang="scss">
.goodInfo_container{
    background-color: #eee;
    overflow: hidden;
    .nowPrice{
        color: red;
        font-size: 16px;
        font-weight: bolder;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 10px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: pink;
        border-radius:50%;
        position: absolute;
        left: 140px;
        top: 420px;
        z-index: 999;
    }
}
</style>