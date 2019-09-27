<template>
    <div>
        <el-button type="primary" icon="el-icon-edit-outline" @click="addArticle">写文章</el-button>

        <div v-for="item in list" v-bind:key="item.id" class="item">
            <router-link :to="'detail/' + item.id">{{item.title}}</router-link>
            <div>
                <el-button type="info" size="mini" icon="el-icon-edit" @click="editArticle(item.id)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteArticle(item.id)">删除</el-button>
            </div>

        </div>

    </div>
</template>

<script>

    import { SET_USER } from '../mutation-types'
    import api from '../utils/api';


    export default {
        name: "AdminArticle",

        data() {
            return {
                page: 1,
                list: [],
            }
        },

        computed: {
           user: {
               get() {
                   return this.$store.state.user;
               },
               set(v) {
                   this.$store.commit(SET_USER, v);
               }
           }

        },

        watch: {

            user: function (newUser, oldUser) {
                console.log('watch');

                if (!oldUser.id && newUser.id) {
                    this.loadData();
                }
            }
        },

        created() {
            this.loadData();
        },

        mounted() {


        },

        methods: {

            loadData() {

                let that = this;

                if (!this.user.id) {
                    return
                }


                api.articleList({'page': this.page, 'user_id': this.user.id }).then(function (res) {

                    if (res.status == 200) {

                        if (res.data.code != 0) {
                            // TODO:
                            console.log(res.data.message)
                            return;
                        }

                        that.list = [];
                        that.list = res.data.data.data;

                    }

                })


            },

            addArticle() {
                this.$router.push('/admin/write');
                // console.log(this.list);
            },

            editArticle(id) {
                this.$router.push('/admin/edit_article/' + id);
            },

            deleteArticle(id) {

                let that = this;
                this.$confirm('确定要删除吗？', '标题', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    api.deleteArticle(id).then(function (res) {
                        if (res.status == 200) {

                            if (res.data.code != 0) {
                                // TODO:

                                this.$alert(res.data.message, '标题', {
                                    confirmButtonText: '确定',
                                });

                                return;
                            }

                            // 重新加载数据
                            that.loadData();
                        }
                    })

                }).catch( () => {});



            },




        }



    }
</script>

<style scoped>
    .item {
        padding-top: 20px;
        border-bottom: 1px solid #f0f0f0;
        min-height: 60px;
    }

    .item a {
        font-size: 26px;

    }

    .item button {
        margin-top: 10px;
        margin-bottom: 20px;
    }
</style>