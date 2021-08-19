# JS20-》》10

## JS

一个简单的思路：事件委托+循环
事件委托就是把 click 事件绑定在最外面的 box 上，这样可以避免给许多个 li 添加监听事件
重点在于点击的逻辑处理
我们只考虑 click with crtl 的情况
比较简单的想法是： 1. 每次 click 都保存下来对应 li 标签的 index 2. 检测每次 click 是否 with cntrl，如果是，就将这两次 click 之间的 li 的 checked 属性赋值为 true，不在范围之内的 li 保持他们的 checked 3. 因为不知道两次 click 的 index 大小，所以设置两个区间

知识点：

```javascript
if (event.target.parentNode === this.children[i]) {
  newindex = i;
}
```

event.target 是 checkbox，其 parentnode 是 li。
由于事件委托，this 是最外面的 box，this 的 children 是 li
使用===，获得 index

## CSS

css 设计了常用的 li 样式

1. 表格 li 间分割线的处理
   分割线用 border-left + border-bottom 设计
   要注意最后一个 li 的 borderbottom 清空
2. li 内部大小的处理
   li contains checkbox + p
   li 的高度由 checkbox 和 p 撑开
   要注意的是，p 要设置 padding，否则 p 左侧的 border 只会和文字高度一致
   另外，li 内部用 flex 布局

---

## 学习

逻辑是：

1. 给每个 li 绑定 handler
2. 维护了一个 inbetween 属性用于选择

每次点击，都一定会把改 li 保存下来（this-》lastchecked），
如果下次点击是 with cnrtl，就把（lastchecked 《-》this 之间的 li.checked = true）

```javascript
function handleCheck(e) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach((checkbox) => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log("Starting to check them in between!");
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}
```
