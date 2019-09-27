<template>
    <div>
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        <vue-editor v-model="form.content" :editor-toolbar="toolBar" />
        <el-button type="primary" @click="onSubmit" class="btn">发布</el-button>
    </div>
</template>

<script>

    import api from '../utils/api';
    import { VueEditor } from "vue2-editor";

    export default {
        name: "EditArticle",

        components: { VueEditor },

        props: {
            id: {
                type: String,
                default: '0',
            }
        },

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
                ]
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
                api.editArticle({
                    'id': this.id,
                    'title': this.form.title,
                    'content': this.form.content,
                }).then(function (res) {
                    loading.close();
                    if (res.status === 200) {
                        if (res.data.code != 0) {
                            that.$alert(res.data.message, '标题', {
                                confirmButtonText: '确定',
                            });
                            return
                        }

                        that.$alert('编辑成功', '标题', {
                            confirmButtonText: '确定'
                        });

                    }
                })

            },

            loadData: function () {

                if (this.id === '0') {
                    return
                }

                let that = this;
                api.articleDetail(this.id).then(function (res) {

                    if (res.status == 200) {

                        if (res.data.code != 0) {
                            // TODO:
                            return;
                        }
                        that.form.title = res.data.data.title;
                        that.form.content = res.data.data.content;
                    }

                })


            },

        },
    }
</script>

<style scoped>

    .btn {
        margin-top: 20px;
    }

</style>