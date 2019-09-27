<template>
  <div id="app">
    <el-container>
      <el-header class="nav">
        <router-link to="/" class="logo">博客</router-link>
        <router-link v-if="!isLogined" to="/register" class="btn">注册</router-link>
        <router-link v-if="!isLogined" to="/login" class="btn">登录</router-link>
<!--        <router-link v-if="isLogined"  class="btn" to="/login" >退出</router-link>-->
        <el-button type="text" v-if="isLogined" class="btn" style="height: 60px;font-size: 16px;" @click="logout">退出登录</el-button>
        <router-link v-if="isLogined" to="/admin" class="btn">后台</router-link>
        <p class="nav-name" v-if="isLogined">{{user.username}}</p>
        <div class="container menu">
          <router-link to="/">首页</router-link> |
          <router-link to="/search">搜索</router-link> |
          <router-link to="/search">相册</router-link>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>


<script>


  import { SET_USER, SET_TOKEN, CLEAR_TOKEN, CLEAR_USER } from "./mutation-types";

  import { mapState } from 'vuex'

  import api from './utils/api'

  export default {
    name: 'app',

    data() {
      return {
        isLogined: false,
      }
    },

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
      token: function (newToken, oldToken) {
        if (oldToken === "" && newToken !== "") {
          this.loadUserDetail();
        }
      }
    },

    created() {
      if (localStorage.token) {
        this.$store.commit(SET_TOKEN, localStorage.token);
      }


    },


    methods: {

      loadUserDetail() {

        let userId = localStorage.id;

        if (!userId) {
          return
        }


        let that = this;
        api.userDetail(userId).then(function (res) {

          if (res.status === 200) {

            if (res.data.code !== 0) {
              return
            } else {
              that.isLogined = true;
              that.$store.commit(SET_USER, res.data.data);
            }
          }
        })
      },

      logout() {

        this.$store.commit(CLEAR_TOKEN);
        this.$store.commit(CLEAR_USER);

        delete localStorage.token;
        delete localStorage.id;

        this.isLogined = false;
      }

    },


  }
</script>

<style>
  @import "~normalize.css";

  .container {
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  .nav {
    border-bottom: 1px solid #f0f0f0;
  }

  .logo {
    margin-left: 30px;
    color: coral;
    float: left;
    line-height: 60px;
  }

  .menu {
    line-height: 60px;
  }

  .btn {
    float: right;
    line-height: 60px;
    padding-right: 20px;
  }

  .nav-name {
    float: right;
    margin-top: 0px;
    line-height: 60px;
    margin-right: 20px;
  }





</style>
