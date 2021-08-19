# [03] CSS Variables

自己写了个十分不 elegant 的方法 ==
学习下 index-finished 的写法

1. 三个控制元件都是 input ，应该使用一次 queryselectorall 获取全部的 input 元素，再 foreach 遍历，addeventlistener 绑定 input 事件
2. 从每个 input 标签里可以获得是否含有单位 px【即 suffix】，再和 input 的 value 值拼接赋值给需要改变的 style
3. 不好的方法就像我做的，获取了巨多 dom 元素，分别绑定事件。
   实际上，应该给整个 page 定义 style 变量，给图片的样式赋值成这个变量，在事件 handler 里改变这个 style 变量

## css

### :root 和 var()

#### :root 伪类 , var() 代替元素中任何属性中的值的任何部分

这个伪元素匹配的是文档的【根元素】，对于 HTML 来说，:root 表示` <html>` 元素，

声明全局的 CSS 变量,然后引用：

```css
:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color);
}
```

finished 里，通过 rootvar 改变全局 css 变量，
而且令 css 变量`--var`的 var 和 input 标签的 name 相同

```javascript
document.documentElement.style.setProperty(
  `--${this.name}`,
  this.value + suffix
);
```

非空 HTML 文档，调用 document.documentElement 总是会返回一个 `<html> `元素，根元素。

## html5

finished 里主要运用了 html5 的 data-，自定义属性

1. 定义：`data-* 全局属性` 是一类被称为自定义数据属性的属性
2. 调用：通过 `HTMLElement.dataset.testValue`
   ( 或者是`HTMLElement.dataset["testValue"]`) 来访问

finished 中：

```javascript
const suffix = this.dataset.sizing || "";
```

获得后缀 px 或为空

## js

### EventTarget.addEventListener() this 问题

普通函数
**【函数名，没括号！！】**
匿名函数（不推荐）
箭头函数
匿名函数（和所有传统的 Javascript 函数）创建他们独有的 this 对象，而箭头函数则继承绑定他所在函数的 this 对象。
this 值是该元素的引用【el】。其与传递给句柄的 event 参数的 currentTarget 属性的值一样。

**this=给回调的传参=触发事件的 dom**

```javascript
el.addEventListener("click", modifyText, false);
el.addEventListener(
  "click",
  function () {
    modifyText("four");
  },
  false
);
el.addEventListener(
  "click",
  () => {
    modifyText("four");
  },
  false
);
```

### change 事件 和 input 事件

htm5 5 新增 input 标签的 type = color /range
每次颜色变更都会触发元素上的 input 事件。
用户关闭选色器之后会触发 change 事件。
每当元素的 value 改变，input 事件都会被触发。这与 change (en-US) 事件不同。change 事件仅当 value 被提交时触发，如按回车键，从一个 options 列表中选择一个值等。

### setProperty

dom.style.setProperty(propertyName, value, priority);
设置属性值
