<template>
    <div>
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        <el-select v-model="selectedCate" placeholder="目录选择">
            <el-option
                    v-for="item in cate"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
        <vue-editor v-model="form.content" :editor-toolbar="toolBar" useCustomImageHandler @image-added="handleImageAdded" />
        <el-button type="primary" @click="onSubmit" class="btn">发布</el-button>
    </div>
</template>

<script>

    import api from '../utils/api';
    import { VueEditor } from "vue2-editor";
    import * as qiniu from 'qiniu-js';

    export default {
        name: "WriteArticle",

        components: { VueEditor },

        data() {
            return {
                form: {
                    title: '',
                    content: '',
                },

                toolBar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ['image', 'code-block']
                ],

                cate: [],

                selectedCate: '',
            }
        },

        created() {
            this.loadData();
        },

        methods: {

            onSubmit() {

                const loading = this.$loading({
                    lock: true,
                    text: '稍等',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });


                let that = this;
                api.addArticle({
                    'title': this.form.title,
                    'content': this.form.content,
                    'category_id': this.selectedCate,
                }).then(function (res) {
                    loading.close();
                    if (res.status === 200) {
                        if (res.data.code != 0) {
                            that.$alert(res.data.message, '标题', {
                                confirmButtonText: '确定',
                            });
                            return
                        }

                        that.$alert('发布成功', '标题', {
                            confirmButtonText: '确定'
                        });

                    }
                })
            },

            loadData: function () {

                let that = this;
                api.cateList().then(function (res) {

                    if (res.status === 200) {
                        if (res.data.code !== 0) {
                            that.$alert(res.data.message, '标题', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            that.cate = [];
                            that.cate = res.data.data;
                        }
                    }
                })
            },

            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {

                const loading = this.$loading({
                    lock: true,
                    text: '稍等',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                let that = this;
                api.qiniuToken().then(function (res) {

                    if (res.status === 200) {

                        if (res.data.code !== 0) {
                            loading.close();
                            that.$alert(res.data.message, '标题', {
                                confirmButtonText: '确定',
                            });
                        }


                        let uploadToken = res.data.data.token;
                        console.log('uploadToken: ' + uploadToken);
                        let observable = qiniu.upload(file, null, uploadToken);

                        let observer = {

                            // todo: 文章内绝对路径问题
                            complete(res) {
                                loading.close();
                                let url = "http://pydq4fkyl.bkt.clouddn.com/" + res.key;
                                Editor.insertEmbed(cursorLocation, "image", url);
                                resetUploader();

                            }
                        };


                        observable.subscribe(observer);

                    }


                })



            }

        },
    }
</script>

<style scoped>

    .btn {
        margin-top: 20px;
    }
</style>