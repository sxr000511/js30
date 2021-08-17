1. 数据 utils.js -》 globalData.js
2. 路由配置 main.js
   添加路由守卫，保证进入 login
3. Login.vue
   添加表单校验，调用 elementui 的校验方法，保存 login 的 name，参考https://element.eleme.cn/#/zh-CN/component/form
4. 【home.vue】主页面-》contains Menu.vue + 路由页面
   整体页面用 element 的页面布局容器，参见https://element.eleme.cn/#/zh-CN/component/container
   主页面，左侧调用 menu.vue，菜单组件，右侧由 header 和 routerview 组成，header 显示登陆状态，view 用来渲染子路由
   当点击左侧 menu，右侧 mainbody 跳转到子路由显示
5. menu.vue
   非常好的地方：
   考虑到渲染菜单时是否是只有一个父菜单，v-if v-for velse 渲染，配合 routerlink，移植性好，
   element 需要 id 绑定菜单，然而 datalist 本身并不需要 id
   因此在 data 输入时，用 map 方法同时给每个父菜单和其下子菜单绑定符合 elementui 的 id
6. product 本身只是一个容器，东西都在 list 和 edit 里，
   list 自身可以完成展示，上下移动，删除，新增/修改需要 router 里 push 进 edit/add，
   并且 list 里面方法 edit / add 调用的是同一个 productedit
   跳转到 productedit 组件对应的子路由 add 或者 edit 后，
   productedit 根据 url 获得 id，如果有 id，到 data.JS 里获得对应数据，绑定到 form 上，用来修改，如果没有 id，则是新增
7. service 是一个整体组件，可以认为 service 是 product 的合体版，在 service 里，可以通过弹窗直接修改（因为没 route），如果在 product 里，就是跳转到 product 下的子路由
   如何直接通过弹窗？
   设计一个 form，其 visible 属性绑定到 dialogFormVisible，当编辑的 btn 点击时，修改 dialogFormVisible 为 true，传参，dialog 显示，
   非常好的地方：
   多选功能是在点击删除后出现的，没有用自带的 type==selection，（这样是默认出现多选 checkbox），

# 1. 设计数据结构

## 菜单

## 列表

列表增删查改需要一个 id 作为唯一标记

# 2. 方法

新增、删除、上移、下移
移动：splice 方法`arrayObject.splice(index,howmany,item1,.....,itemX)`
第一个不上移，最后一个不下移

# 3.element-ui

## NavMenu 导航菜单

1. 侧栏菜单
   https://element.eleme.cn/#/zh-CN/component/menu#ce-lan
   注意 active 的 index 是 string
2. 当有 submenu 时，每个 submenu 用 routerlink 生成，为了路由跳转
   无 submenu 时，routerlink 到 el-menu 父元素上
3. 自动给 data 里的数据添加 index，符合 elementui 要求的 index：
   模板运算符，...扩展运算符，map 方法，默认参数

## Table 表格

1.  https://element.eleme.cn/#/zh-CN/component/table
    当 el-table 元素中注入 data 对象数组后，在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。可以使用 width 属性来定义列宽。

```javascript
const menus = [
  ...
].map((x, i) => {
  // 添加 index，可用于默认展开 default-openeds 属性，和激活状态 efault-active 属性的设置
  return {
    ...x,
    // 子菜单就拼接${父菜单index}-${子菜单index}
    subMenus: (x.subMenus || []).map((y, j) => {
      return { ...y, index: `${i}-${j}` };
    }),
    // 父菜单就把 index 加上好了
    index: `${i}`,
  };
});
```

2. 结合组件 button

```
  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
```

### 表单 Element-Form + Element-Dialog

用来添加数据，dialog

1. form
   https://element.eleme.cn/#/zh-CN/component/form#form-item-methods
2. dialog
   https://element.eleme.cn/#/zh-CN/component/dialog

# 页面和路由

页面是特殊的组件，路由和页面路径是一一对应的，所以我们需要先设计应用的页面逻辑。
几种常用的管理端页面类型

1. 登录页 只有用户名和密码的输入
2. 列表 + 表单 单页可以完成某类服务的增删查改
3. 列表页 只有列表展示，提供查和删服务，需要配合 4 的表单页完成增和改
4. 表单页 只有表单编辑内容，可提供新增、修改等能力给 3 使用

注意路由嵌套关系
service 服务信息，包括 列表左侧，和弹出的表单
product 产品信息，是 table 展示

```
/login                     /home                     /home/service
+------------------+       +-----------------+       +-----------------+
| App              |       | App             |       | App             |
| +--------------+ |       | +-------------+ |       | +-------------+ |
| | Login        | |       | | Home        | |       | | Home        | |
| |              | |       | |             | |       | | +---------+ | |
| |              | |  +--) | |<router-view>| |  +--) | | | Service | | |
| |              | |       | |  无对应内容  | |       | | |列表+表单 | | |
| |              | |       | |             | |       | | +---------+ | |
| +--------------+ |       | +-------------+ |       | +-------------+ |
+------------------+       +-----------------+       +-----------------+


      /home/product                /home/product/list              /home/product/edit
      +---------------------+      +------------------------+      +------------------------+
      | App                 |      | App                    |      | App                    |
      | +-----------------+ |      | +--------------------+ |      | +--------------------+ |
      | | Home            | |      | | Home               | |      | | Home               | |
      | | +-------------+ | |      | | +----------------+ | |      | | +----------------+ | |
 +--) | | | Product     | | | +--) | | | Product        | | | +--) | | | Product        | | |
      | | |<router-view>| | |      | | | +------------+ | | |      | | | +------------+ | | |
      | | |  无对应内容  | | |      | | | | ProductList| | | |      | | | | ProductEdit| | | |
      | | |             | | |      | | | | 单列表页    | | | |      | | | | 单表单页    | | | |
      | | |             | | |      | | | +------------+ | | |      | | | +------------+ | | |
      | | +-------------+ | |      | | +----------------+ | |      | | +----------------+ | |
      | +-----------------+ |      | +--------------------+ |      | +--------------------+ |
      +---------------------+      +------------------------+      +------------------------+

```

1. router-view 渲染
2. router-link 跳转(element 结合) 或者 this.$router.push
3. 路由 watch
   <el-menu>的配置得：
   default-active 属性需要设置当前激活菜单的 index，因此我们需要监控$route 的变化，并根据路由情况调整绑定的激活 index。
   先在第一级菜单里找，再在一级里面找
   ```
    watch: {
   // 为了设置 el-menu 的 default-active 属性，需要获取到路由状态
   $route(to) {
     // 对路由变化作出响应...
     let activeIndex;
     // 找到匹配的 routerName
     this.menus.forEach(x => {
       if (x.routerName === to.name) {
         activeIndex = x.index;
       } else {
         const subMenuItem = x.subMenus.find(y => y.routerName === to.name);
         if (subMenuItem) {
           activeIndex = subMenuItem.index;
         }
       }
     });
     // 并将 activeIndex 设置为对应的 菜单 index
     if (activeIndex) {
       this.activeIndex = activeIndex;
     }
   ```

# 添加鉴权：只有登录了才能进入管理系统

## 1. 先不用 vuex，globalData.js 作为全局数据库

还没有存到 cookie/storage 里，会刷新丢失

## 2.login.vue

校验成功后，` this.$router.push({ name: "Home" });`进入 homevue 页面

## mainjs 里守卫

vue-router 的 router.beforeEach 导航守卫：

```
router.beforeEach((to, from, next) => {
  if (to.name !== "Login") {
    // 非 login 页面，检查是否登录
    // 这里简单前端模拟是否填写了用户名，真实环境需要走后台登录，缓存到本地
    if (!getGlobalData("username")) {
      next({ name: "Login" });
    }
  }
  // 其他情况正常执行
  next();
});
```
