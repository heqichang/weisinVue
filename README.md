## 开发环境

* node v11.0.0
* vue-cli 3.9.3


## 安装部署

* 获取到代码后，进入到项目根目录下，执行以下命令安装依赖 
```
npm install
```

* 本地测试可以直接运行以下命令就可以使用了 
```
npm run serve
```

* 正式部署需要 build 后的文件放 nginx 这类服务器下就行了，执行以下命令 build

```
npm run build
```

* 拷贝 build 后的文件（在项目根目录 /dist 下），到 nginx 指向的 /root 路径就可以了

