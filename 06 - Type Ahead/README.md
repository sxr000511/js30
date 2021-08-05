# 正则 + fetch() +es6 扩展操作符...

## fetch

fetch() 建立起跨域异步会话
它只是一个 HTTP 响应，而不是真的 JSON。返回 promise
为了获取 JSON 的内容，我们需要使用 .json() /.blob()
【在 httprespons 的 body 里】 等

```javascript
// 上传json
var url = "https://example.com/profile";
var data = { username: "example" };

fetch(url, {
  method: "POST", // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response));
```

```javascript
// 获得json
fetch("http://example.com/movies.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });
```

## 正则

new RegExp(pattern[, flags])
pattern
正则表达式的文本。
flags
g （全局匹配） i （忽略大小写） 。。。

1. 如果你需要知道一个字符串是否与一个正则表达式匹配 RegExp ，可使用 RegExp.test() 。
2. 如果你只是需要第一个匹配结果，你也可以使用 RegExp.exec() 。
3. 如果你想要获得捕获组，并且设置了全局标志，你需要用 RegExp.exec() 或者 String.prototype.matchAll()

## 是否匹配

### RegExp.prototype.test()

是否匹配。返回 true 或 false。

```javascript
let str = "hello world!";
let result = /^hello/.test(str);
console.log(result);
// true
```

### String.prototype.search()

是否匹配.
如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。

```javascript
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation
```

## 匹配信息

### String.prototype.match()

match() 方法检索返回一个字符串匹配正则表达式的结果。

```javascript
const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

### RegExp.prototype.exec()

当正则表达式使用**g**标志时，可以**多次执行** exec 方法来**查找同一个字符串**中的成功匹配。当你这样做时，查找将从正则表达式的 **lastIndex** 属性指定的位置开始。

```javascript
const regex1 = RegExp("foo*", "g");
const str1 = "table football, foosball";
let array1;

while ((array1 = regex1.exec(str1)) !== null) {
  console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}
```

### String.prototype.matchAll()

如果使用**matchAll ，就可以不必使用 while 循环加 exec 方式**（且正则表达式需使用 /g 标志）。使用 matchAll 会**得到一个迭代器的返回值**，配合 for...of, array spread, 或者 Array.from() 可以更方便实现功能：

```javascript
const regexp = RegExp("foo[a-z]*", "g");
const str = "table football, foosball";
const matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(
    `Found ${match[0]} start=${match.index} end=${
      match.index + match[0].length
    }.`
  );
}
// expected output: "Found football start=6 end=14."
// expected output: "Found foosball start=16 end=24."

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
Array.from(str.matchAll(regexp), (m) => m[0]);
// Array [ "football", "foosball" ]
```

### 扩展运算符...

外部 const names = []
`names.push(...myJson);`
// 这儿是深拷贝，获得 myjson 为对象数组，深拷贝到 names 里，
// names 里存的是索引，所以外部声明 const，可以给 names 幅值
// 如果在此处更改 names[0]，会发现 names[0]和 myjson[0]不同
