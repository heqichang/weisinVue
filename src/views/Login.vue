<template>
   <div class="container">
       <el-row type="flex" class="row-bg" justify="center">
           <el-col :span="12">
               <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                   <el-form-item label="用户名" prop="username">
                       <el-input v-model="form.username" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="密码" prop="password">
                       <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                   </el-form-item>

                   <el-form-item>
                       <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                       <el-button @click="resetForm('ruleForm')">重置</el-button>
                   </el-form-item>
               </el-form>
           </el-col>
       </el-row>

   </div>
</template>

<script>

    import api from '../utils/api';
    import { SET_TOKEN } from "../mutation-types";

    export default {
        name: "Login",

        data() {

            return {

                form: {
                    username: '',
                    password: '',
                },

                rules: {
                    username: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ]
                }


            }

        },

        methods: {

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        localStorage.removeItem('token');

                        const loading = this.$loading({
                            lock: true,
                            text: '稍等',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });

                        let that = this;

                        api.login(this.form.username, this.form.password).then(function (res) {

                            loading.close();
                            if (res.status == 200) {
                                if (res.data.code != 0) {
                                    that.$alert(res.data.message, '标题', {
                                        confirmButtonText: '确定',
                                    });

                                } else {


                                    localStorage.token = res.data.data.token;
                                    localStorage.id = res.data.data.id;

                                    that.$store.commit(SET_TOKEN, res.data.data.token);

                                    that.$router.push('/');
                                }
                            }

                        });




                    } else {
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },


    }
</script>

<style scoped>

</style>