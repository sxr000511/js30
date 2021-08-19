简单的博客管理系统
vue +vuerouter+ node express + axios + mogodb
没有 vuex
【昨天那个用到 vuex 了，更复杂】

涉及了：
【同步异步】async await
【跨域】 cors 引入

# 模板设计

1. 用 element 提供的样例修改一下
2. 给 menu 添加属性
   in menu attribue：
   ==router：==
   是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 boolean — false
   这样就可以给 menuitem 加路由
   in menu item attribute：
   index 唯一标志 string — —
3. 因此右侧要放 routerview
4. 在 articlelist 里，用 form 提交表单

# src 里建立 server 文件夹放后端代码

因为很简单所以 mongodb 和 express 写到一起

1. 安装 【后端】express mongoss cors(跨域后端 3001 前端 8080)
2. 配置 express，见之前的 note，注意 async await
3. 启动：
   1. npm run serve 启动前端
   2. nodemon(node 自动刷新工具)index.js 启动后端
4. 安装【前端】axios，定义$HTTP 挂载在顶层 vue 的原型链上，整个项目都可以通过它来向后端发起 axios 请求

## server/index.js 服务端【express + mongodb】

get:查
post：增
delete：删（id 匹配）
edit：新增 vue 组件，在 list 页面点击修改时跳转到新的 url
put：修改，覆盖型

# url 注意

注意请求/访问的都是什么地址
index.Js 是后端接口的 url 服务器接口地址
前端的 router/index.js 是 前端页面的地址
前端 router 跳转到对应的 vue 组件里，调用$httP 发起请求(getpostdeleteput)后，获得返回的 promise 对象，.then 进一步处理
后端 server 监听到请求后，调用 mogodb 方法做数据库 CRUD，异步返回状态/数据
