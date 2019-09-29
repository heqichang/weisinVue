import axios from 'axios'

function request(options) {

    return axios(options).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })
}

function authRequest(options) {

    options.headers = {'my-token': localStorage.token};
    // options.headers = {'my-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Njk0MTc3NDksImV4cCI6MTYwMDk1Mzc0OSwic3ViIjo2LCJqdGkiOiJhYzgwYzA3MmZjZGI0MTYyMjRkYmE0MDg2Nzc2YjRlYyIsImV4dCI6eyJsb2dpbl90aW1lIjoiMjAxOS0wOS0yNSAyMToyMjoyOSJ9fQ.0fbfTbZF9kGbsZ4sFd7w8dhF8hAotwq93pBNBgrtbVk'};

    return request(options)
}

export default {

    // 注册
    register: function (name, pass) {

        return request({
            method: "post",
            url: "/user/register",
            data: {
                'username': name,
                'secret': pass,
            },
        })
    },


    // 登录
    login: function (name, pass, captcha, timestamp) {

        return request({
            method: "post",
            url: "/user/login",
            data: {
                'username': name,
                'secret': pass,
                'captcha': captcha,
                'timestamp': timestamp,
            },
        })
    },

    // 文章列表
    articleList: function (params) {
        return request({
            method: "get",
            url: "/article/list",
            params: params
        })
    },

    // 文章详情
    articleDetail: function (id) {
        return request({
            method: "get",
            url: "/article/detail",
            params: {
                'id': id,
            }
        })
    },

    // 用户详情
    userDetail: function (id) {
        return request({
            method: "get",
            url: "/user/detail",
            params: {
                'id': id,
            }
        })
    },

    // 发布文章
    addArticle: function (data) {
        return authRequest({
            method: "post",
            url: "/article/post",
            data: data,
        })
    },

    // 编辑文章
    editArticle: function (data) {

        return authRequest({
            method: "post",
            url: "/article/edit",
            data: data
        });
    },

    // 删除文章
    deleteArticle: function (id) {

        return authRequest({
            method: "post",
            url: "/article/delete",
            data: {
                'id': id,
            }
        })
    },

    // 目录列表
    cateList: function () {
        return authRequest({
            method: "get",
            url: "/category/list",
        })
    },

    // 目录创建
    addCate: function (name) {

        return authRequest({
            method: "post",
            url: "/category/add",
            data: {
                'name': name,
            }
        })
    },

    // 编辑目录
    editCate: function (id, name) {

        return authRequest({
            method: "post",
            url: "/category/edit",
            data: {
                'id': id,
                'name': name,
            }
        })
    },


    // 删除目录
    deleteCate: function (id) {

        return authRequest({
            method: "post",
            url: "/category/delete",
            data: {
                'id': id,
            }
        })
    },


    // 七牛授权
    qiniuToken: function () {

        return authRequest({
            method: "get",
            url: "/qiniu/auth",
        })
    }




}

