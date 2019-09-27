<template>
  <div class="container">
    <div v-for="item in list" v-bind:key="item.id" class="item">
      <router-link :to="{name: 'detail', params: { id : item.id }}">{{item.title}}</router-link>
      <p>{{item.user.username}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import api from '../utils/api';

export default {
  name: 'home',

  data() {
    return {
      page: 1,
      lastPage: 0,
      total: 0,
      list: [],
    }
  },

  created() {
    this.loadData();
  },

  activated() {



  },
  methods: {


    loadData: function () {



      let that = this;
      api.articleList({'page': this.page}).then(function (res) {

        if (res.status == 200) {

          if (res.data.code != 0) {
            // TODO:
            return;
          }

          that.list = [];
          that.list = res.data.data.data;
          that.total = res.data.data.total;
          that.lastPage = res.data.data.last_page;

        }

      })


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

  .item p {
    color: #b4b4b4;
  }

</style>
