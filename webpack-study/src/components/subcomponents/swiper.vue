<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--谁使用谁传bannerList-->
            <mt-swipe-item v-for="item in bannerList" :key="item.id">
                <img :src="item.img" alt="" :class="{width:bol}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props:['bannerList','bol'],

    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        .width{
            width: 100%;
        }
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            img{
                height: 100%;
            }
        }
    }

</style>