import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Article.vue'),
      props: true,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/admin',
      // name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      children: [
        {
          path: '',
          name: 'admin_article',
          component: () => import(/* webpackChunkName: "admin_article" */ './views/AdminArticle.vue')
        },
        {
          path: 'category',
          name: 'admin_category',
          component: () => import(/* webpackChunkName: "admin_category" */ './views/AdminCategory.vue')
        },
        {
          path: 'album',
          name: 'admin_album',
          component: () => import(/* webpackChunkName: "admin_album" */ './views/AdminAlbum.vue')
        },
        {
          path: 'photo/:id',
          name: 'admin_photo',
          component: () => import(/* webpackChunkName: "admin_album" */ './views/AdminPhoto.vue'),
          props: true,
        },
        {
          path: 'write',
          name: 'write_article',
          component: () => import(/* webpackChunkName: "write_article" */ './views/WriteArticle.vue')
        },
        {
          path: 'edit_article/:id',
          name: 'edit_article',
          component: () => import(/* webpackChunkName: "write_article" */ './views/EditArticle.vue'),
          props: true,
        },
      ]
    },

  ]
})
