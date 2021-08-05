# ARRAY 第二期

比第一期简单
重点：

```javascript
// comments.splice(index, 1);
// 效果相同
const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)];
```

## Array.prototype.some()

是否有满足？
返回 boolea

## Array.prototype.every()

是否都满足？
返回 boolea

## Array.prototype.findIndex()

满足的 index

## 删除指定 splice / slice

splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
【更好，又可以删除又可以添加】
slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。

```javascript
const animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
```

因为答案用 slice 是浅拷贝所以。。

```
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
```
