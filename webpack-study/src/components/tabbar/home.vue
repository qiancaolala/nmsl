<template>
    <div>
        <!--轮播图-->
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item v-for="item in bannerList" :key="item.id">-->
                <!--<img :src="item.img" alt="">-->
            <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
        <swiper :bannerList="bannerList" :bol="true"></swiper>
        <!--六宫格区域-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodList">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">购买商品</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>

    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    export default {
        name: "home",

        data(){
            return{
                bannerList:[]
            }
        },
        components:{
            swiper
        },
        methods:{
            getBanner(){
              //获取轮播图数据
              this.$http.get('http://www.liulongbin.top:3005/api/getlunbo')
                  .then(result=>{
                      if (result.body.status===0){
                          this.bannerList=result.body.message
                      }

                  })
            },
        },
        created(){
            this.getBanner();
        }
    }
</script>

<style scoped lang="less">
    /*.mint-swipe{*/
        /*height: 200px;*/
        /*.mint-swipe-item{*/
            /*background-color: pink;*/
            /*img{*/
                /*width: 100%;*/
                /*height: 100%;*/
            /*}*/
        /*}*/
    /*}*/
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        img{
            width: 50px;
            height: 50px;
        }
    }
    .mui-table-view-cell.mui-media{
         border: none;
     }

</style>