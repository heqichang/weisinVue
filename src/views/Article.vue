<template>
   <div class="container">
      <h1>{{article.title}}</h1>
      <div>{{article.create_time}} - {{article.user.username}}</div>
<!--      <div id="editor" ref="editor"></div>-->
      <vue-editor v-model="article.content" disabled :editor-options="option" />
   </div>
</template>

<script>

   import api from '../utils/api';

    export default {
       name: "Article",
       props: {
          id: {
             type: String,
             default: '0',
          }
       },

       data() {
          return {
             article: {},
             option: {
                theme: 'bubble'
             },
          }
       },

       created() {
         this.loadData();



       },



       methods: {

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

                   that.article = res.data.data;
                }

             })


          },


       }
    }
</script>

<style scoped>

   @import "~quill/dist/quill.snow.css";




</style>