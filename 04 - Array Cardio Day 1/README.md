# array 练习

重点：
reduce，nodelist 和 array 的区别，不要乱填{}

## Array.prototype.filter()

filter 为数组中的每个元素调用一次 callback 函数，
并利用所有使得 callback 返回 **true 或等价于 true 的值的元素**创建一个新数组。

```javascript
// 1. Filter the list of inventors for those who were born in the 1500's
function filterByYear(item) {
  return item.year > 1500 && item.year < 1600;
}
var fltrslt = inventors.filter(filterByYear);
```

## Array.prototype.map()

map() 方法创建一个新数组，其结果是该数组中的每个元素是**调用一次**提供的函数后的返回值。

```javascript
// 2. Give us an array of the inventors first and last names

var maprslt = inventors.map(function (obj) {
  return obj.first + obj.last;
});
```

## Array.prototype.sort()

如果 compareFunction(a, b) **小于 0** ，那么 a 会被排列到 b 之前
**数组已原地排序**

```javascript
// 3. Sort the inventors by birthdate, oldest to youngest
var sortrslt = inventors.sort((a, b) => {
  return a.year - b.year;
});
```

array.map +string.split+array.sort

```javascript
// 7. sort Exercise
// Sort the people alphabetically by last name
var lastname = people.map((index) => index.split(",")[1]);
// console.log(lastname);
var resultname = lastname.sort();
// console.log(resultname);
```

## Array.prototype.reduce() 《《《---MDN

`array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`
**四参数前两个必有，acc 累加值，cur 当前值，有顺序**
// 返回值:函数累计处理的结果
**要提供 acc 的初始值！！{} or [] or 0**
// **不要乱加括号** 有{}有 return，没{}没 return

```javascript
// 4. How many years did all the inventors live all together?
var reducerslt = inventors.reduce((acc, cur) => {
  return acc + cur.passed - cur.year;
}, 0);
// 或者
// var reducerslt = inventors.reduce(
//   (acc, cur) => acc + cur.passed - cur.year,
//   0
// );
// console.log(reducerslt);

// 8. Reduce Exercise
// Sum up the instances of each of these
// MDN:计算数组中每个元素出现的次数,
var result = data.reduce((acc, cur) => {
  // 不是acccur===null
  // acc对象，cur是key，累加value
  if (!acc[cur]) {
    acc[cur] = 0;
  }
  acc[cur]++;
  return acc;
}, {});
console.log(result);
```

acc 是 object，cur 是 key，acc[cur]是 number（计数）

### MDN 的好例子：

#### 将二维数组转化为一维

```javascript
var flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((acc, cur) => acc.concat(cur), []);
```

#### 计算数组中每个元素出现的次数

```javascript
var names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  } else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

#### 按属性对 object 分类

```javascript
var people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, "age");
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

## de in paris

nodelist.map + array.from + array.filter

```javascript
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

var streets = document.querySelectorAll(".mw-category li a");
streets = Array.from(streets);
var streetnames = streets.map((index) => index.innerHTML);
var result = streetnames.filter((street) => street.includes("de"));
// expect result:
// ["Boulevard de l'Amiral-Bruix", "Boulevard des Capucines", "Boulevard de la Chapelle", "Boulevard de Clichy", "Boulevard de l'Hôpital", "Boulevard des Italiens", "Boulevard de la Madeleine", "Boulevard de Magenta", "Boulevard Marguerite-de-Rochechouart", "Boulevard de Sébastopol", "Boulevard de Strasbourg", "Boulevard de la Zone"]
```

String.prototype.includes()
includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
并且，streetnames 从 queryselector 来的是 nodelist，不是 array，没有 filter 方法
要先 array.from 转换成 array

recite from mdn：
**【原型链】**
**NodeList 不是一个数组，是一个类似数组的对象(Like Array Object)。
虽然 NodeList 不是一个数组，但是可以使用 forEach() 来迭代。
你还可以使用 Array.from() 将其转换为数组。**

```
为什么 NodeList 不是数组？
NodeList 对象在某些方面和数组非常相似，看上去可以直接使用从 Array.prototype 上继承的方法。然而，除了 forEach 方法，NodeList 没有这些类似数组的方法。

JavaScript 的继承机制是基于原型的。数组元素之所以有一些数组方法（比如 forEach 和 map），是因为它的原型链上有这些方法，如下:

myArray --> Array.prototype --> Object.prototype --> null（想要获取一个对象的原型链，可以连续地调用 Object.getPrototypeOf，直到原型链尽头）。

forEach，map 这些方式其实是 Array.prototype 这个对象的方法。

和数组不一样的是，NodeList 的原型链是这样的：

myNodeList --> NodeList.prototype --> Object.prototype --> null

NodeList 的原型上除了类似数组的 forEach 方法之外，还有 item，entries，keys 和 values 方法。
```
