<template>
    <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea placeholder="请输入评论内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postCommoent">发表评论</mt-button>
        <div class="list">
            <ul>
                <li v-for="(item,index) in comment">
                    <div class="user">
                        第{{index+1}}楼 用户 :{{item.user_name}}
                        发表时间: {{item.add_time | dateFormat}}
                    </div>
                    <div class="body">
                        {{item.content}}
                    </div>
                </li>
            </ul>
        </div>
        <!--加载更多-->
        <mt-button type="danger" size="large" plain="" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "comment",

        data() {
            return {
                comment: [],
                msg: '',
                pageindex: 1,
                id:1,
            }
        },
        methods: {
            getComment() {

                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(result => {
                    if (result.body.status === 0) {
                        //拼接数组
                        this.comment = this.comment.concat(result.body.message)
                    }
                })

            },
            postCommoent() {
                if (this.msg.trim().length == 0) {
                    Toast('评论内容不能为空!')
                    return false;
                }
                //参数①:地址 参数②:交给服务器的数据对象 参数③:定义提交的格式为普通表单的格式==>已经全局配置过了,可省略
                this.$http.post('api/postcomment/' + this.id, {content: this.msg})
                    .then((reslut) => {
                        if (reslut.body.status === 0) {
                            Toast('提交成功!')
                            //拼接出一个评论对象
                            let user = {
                                user_name: '匿名用户',
                                add_time: Date.now(),
                                content: this.msg
                            }
                            this.comment.unshift(user)
                            this.msg = ''
                        }
                    })
            },
            //点击加载更多
            getMore() {
                this.pageIndex++;
                this.getComment();
            }
        },
        created() {
            this.id=this.$route.params.id
            this.getComment()
        }
    }
</script>

<style scoped lang="scss">
    .sub_container {
        textarea {
            height: 80px;
            margin: 0;
            font-size: 14px;
        }
        .list {
            ul {
                padding-left: 0px;
                li {
                    list-style: none;
                    margin: 5px 0;
                    .user {
                        line-height: 30px;
                        background-color: #CCCCCC;
                        font-size: 14px;
                    }
                    .body {
                        line-height: 35px;
                        text-indent: 2em;
                    }

                }
            }
        }
    }
</style>