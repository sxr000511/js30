# js20-13

## css

translate

## js 滚动事件监听

### 1. 几种 height 的含义

![scroll](https://camo.githubusercontent.com/8e506cb1ccf267064d30a8f10330d1e8bc0d9d01812432ed402e99a6e4748d3c/68747470733a2f2f636c2e6c792f3077337031763179337131342f496d616765253230323031372d30372d3138253230617425323031302e32342e31302532302545342542382538412545352538442538382e706e67)

1. HTMLElement.**offsetTop** : 它返回当前元素**相对于其 offsetParent** 元素的顶部内边距的距离。
2. Window.**scrollY** : 返回**文档**在垂直方向已滚动的像素值。
   【页面的运动，依据这个来进行判断】
3. Window.**innerHeight** : 浏览器**窗口的视口**（viewport）高度（以像素为单位）.
   如果有水平滚动条，也包括滚动条高度。

![height](https://developer.mozilla.org/@api/deki/files/213/=FirefoxInnerVsOuterHeight2.png)
【包括滚动条】

### 2. 思路

图片有几个

1. 滑入：当 scollY 到达图片的上沿时，滑入
   1. 图片的上沿在：window.scrollY + window.innerheight > element.offsettop + 1/2height
2. 滑出： 当 scollY 到达图片下沿时，滑出
   图片下沿在：element.offsettop + height

```javascript
function cal() {
  // console.log(imgs);
  //   console.log(window.scrollY);
  imgs.forEach((img) => {
    if (
      window.scrollY + window.innerheight >
      img.offsetTop + 0.5 * img.height
    ) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}
```

# debounce（防抖）和 throttle（节流）

知识应用：闭包，apply

窗口的 resize、scroll，输入框内容校验等操作
如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。
![](https://images2017.cnblogs.com/blog/1094893/201711/1094893-20171120172217415-1848957105.png)
debounceTail：执行操作在连续操作完成之后，触发；
debounceStart：执行操作在连续操作完成之前，触发；
throttle：在一个连续操作行为中，每间隔 delay 的时间触发 1 次。

常用情景：

1. scroll 事件：当页面发生滚动时，scroll 事件会被频繁的触发，1s 触发可高达上百次。在 scroll 事件中，如果有复杂的操作（特别是影响布局的操作），将会大大影响性能，甚至导致浏览器崩溃。所以，对其进行防抖、限频很重要。
2. click 事件：用户进行 click 事件时，有可能连续触发点击（用户本意并非双击）。该操作有可能是不小心多次连续点击，也可能是页面状况不好的情况下，期待尽快得到反馈的有意行为；但这样的操作，反而会加剧性能问题，因此也有必要考虑防抖、限频。
3. input 事件：如 sug 等需要通过 ajax 及时获得数据的情况，需要进行限频，防止频繁的请求发生，减少服务器压力的同时，提高页面响应性能。
4. touchmove 事件：同 scroll 事件类似。
   还有许多其他业务场景会出现频繁操作的情况，不一一列举。
   debounce 可用于：防止用户的多次 click 提交；scroll 下拉刷新时，同一位置多次请求数据等。多用于输入框，当某一次输入后停顿满 n 秒才会去触发远程搜索。
   throttle 多用于高频操作，如抢票、抢购等，无论点击多少次，只固定间隔执行一次，以减轻压力。

## 1. debounce

当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件

1. 函数可传入参数
   JavaScript 在事件处理函数中会提供事件对象 event，所以我们要实现传参功能。

```javascript
function debounce(method, wait) {
  let timeout;
  // args为返回函数调用时传入的参数，传给method
  return function (...args) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      // args是一个数组，所以使用fn.apply
      // 也可写作method.call(context, ...args)
      method.apply(context, args);
    }, wait);
  };
}
```

2. 提供立即执行选项
   有些时候我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 毫秒后，才可以重新触发执行。

```javascript
function debounce(method, wait, immediate) {
  let timeout;
  return function (...args) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
      // 这样确保立即执行后wait毫秒内不会被再次触发
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        method.apply(context, args);
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        // args是一个类数组对象，所以使用fn.apply
        // 也可写作method.call(context, ...args)
        method.apply(context, args);
      }, wait);
    }
  };
}
```

finished 里的版本多了 immediate 参数

```javascript
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    // wait 秒后将 timeout === null，在wait前timeout都是fun不是null
    // immediate： 计时结束立即调用，否则等待返回后调用
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
```

## 2. throttle（节流）

```javascript
// 定时器方案
function throttle(fn, wait) {
  let timer = null;

  return function () {
    let _this = this;
    let _arguments = arguments;

    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(_this, _arguments);
        timer = null;
      }, wait);
    }
  };
}

function handle() {
  console.log(Math.random());
}

window.addEventListener("mousemove", throttle(handle, 1000));
```

## 大坑 addeventlistener 的参数

https://www.cnblogs.com/embrace-ly/p/10570052.html

      window.addEventListener("scroll", debounce(cal));

      // 或者cal
      // 不能写成cal()
      // 具名函数带参数？
      // 不能传参-》函数名 ，解决方法，在匿名函数里传入参数
      // 如果不这样的话，实际上第二个参数会是该handler的返回值
      <!-- 可行：匿名函数 -->
      // window.addEventListener("scroll", function () {
      //   debounce(cal(imgs));
      // });
