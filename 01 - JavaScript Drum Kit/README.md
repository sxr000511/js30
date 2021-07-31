## drum kit

### 简单利用排他思想实现

1. 监听 document 的 keydown 事件
2. queryselector + css selectors + getattribute 获得按下的 key 对应的 div 和 audio
3. 排他思想添加样式 playing
4. 播放声音
5. keyup 时删除样式 playing

#### css 复杂 selector

```
   <!-- 选择div类名keys下的有data-key = ~~属性的div -->
      key = document.querySelector(`div.keys div[data-key="${e.keyCode}"]`);
<!-- 选择audio标签中含有~~属性的audio -->
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

```

#### 添加删除类名

```javascript
 dom.classList.add('要添加的类名')
 dom.classList.remove('要移除的类名')
```

```javascript
dom.getAttribute('~')
```



### css样式移除参考源码

```javascript
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}
  
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend',stopTransition));  

```

- 监听每一个按键元素的`transitionend`事件，当按键元素的动画结束后会触发`removeTransition`函数。
- `propertyName`属性，可以通过判断`propertyName`等于其中的一个值（例如'transform'），等于该值就移除`playing`类，也即移除动画。
- e.target === this  【是对应的key】事件绑定的对象







