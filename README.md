

---
* [开发环境](#开发环境)
* [环境配置](#环境配置)
* [容器部署](#容器部署)


---

# 开发环境

* node v11.0.0
* vue-cli 3.9.3


# 环境配置

* 获取到代码后，进入到项目根目录下，执行以下命令安装依赖 

```
npm install
```

* 项目中修改你本地请求 api 的地址，在 utils/env.js 文件中，修改 BaseUrl 变量为你本机配置的服务端地址

```js
export default {
    BaseUrl: "http://192.168.101.10"
}
```

* 本地测试可以直接运行以下命令就可以使用了 

```
npm run serve
```

* 正式部署需要 build 后的文件放 nginx 这类服务器下就行了，执行以下命令 build


```
npm run build
```




* nginx 配置如下，root 路径改为项目中 dist 的路径

```
server {
    listen       80;
    server_name  .weisin-vue.app;

    location / {
        root   /usr/share/nginx/html;
        try_files $uri $uri/ @router;
        index  index.html index.htm;
    }

    location @router {
        rewrite ^.*$ /index.html last;
    }

}

```
* 本机部署需要自己放 dist 的文件到 nginx 的 root 目录下，如果使用容器的话，不用单独去安装配置 nginx ，按照以下方法可以直接运行


# 容器部署
* 项目 build 之后在项目根目录下运行以下命令

```
docker build -t heqichang/weisin-vue .
```

* 之后可以运行

```
docker run -d -p 8888:80 heqichang/weisin-vue
```

* 最后在浏览器输入 localhost:8888 就能看见网页了
