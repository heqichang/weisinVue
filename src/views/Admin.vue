<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">

                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <span slot="title">目录管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">相册管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { SET_TOKEN } from "../mutation-types";
    import { mapState } from 'vuex'

    export default {
        name: "Admin",

        computed: {
            ...mapState([
                'user',
            ]),

            token: {
                get() {
                    return this.$store.state.token;
                },
                set(v) {
                    this.$store.commit(SET_TOKEN, v);
                }
            }
        },

        watch: {

            $route: function (to, from) {

                console.log(to, from);
            },

            token: function (newToken, oldToken) {
                if (oldToken !== '' && newToken === "") {
                    this.$router.replace('/')
                }
            }
        },

        created() {

            if (!localStorage.token) {
                this.$router.replace('/');
            }


        },




        methods: {
            handleSelect(index) {
                switch (index) {
                    case '1':
                        this.$router.push('/admin');
                        break;
                    case '2':
                        this.$router.push('/admin/category');
                        break;
                    case '3':
                        this.$router.push('/admin/album');
                        break;
                    default:
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>