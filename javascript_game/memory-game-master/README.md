# 翻卡片游戏

needtodo

1. 卡片的位置是随机的
   因此 html 的 render 在 js 里完成
   两种方法 1. 随机产生 id，然后根据 id 将整个 array 进行 sort 2. 随机 sort 整个 array，然后再 render 的时候赋予每个 img 按顺序的 id
   自定义属性 data-id
2. 逻辑判断
   1. 通过 id 是否相同，判断是否是点击了同一个
   2. 通过 id 对应 item 的 name 是否相同，判断是否是完成了一对儿

```javascript
//   对imgs进行随机排序
imgs.sort(() => 0.5 - Math.random());
console.log(imgs);
// render original dom tree 全是背面
var result = document.querySelector("#result");
var grid = document.querySelector(".grid");
var loop = 0;
imgs.forEach(() => {
  // console.log(grid);
  let addin = document.createElement("img");
  addin.setAttribute("data-id", loop++);
  addin.src = "images/blank.png";
  addin.addEventListener("click", clickhandler);
  grid.appendChild(addin);
});
var answer = [];
var correctnum = 0;
function clickhandler() {
  let num = this.getAttribute("data-id");
  // 存入id用于判断是否相同，存入img用于判断是否答案正确
  // 阻止快速点击
  if (answer.length <= 1) {
    this.src = imgs[num].img;
    answer.push({ num: num, pic: imgs[num] });

    if (answer.length === 2) {
      let an1 = answer[0];
      let an2 = answer[1];
      console.log(answer);
      grid.children[an1.num].src = an1.pic.img;
      grid.children[an2.num].src = an2.pic.img;
      setTimeout(function () {
        mathhandler(an1, an2);
      }, 1000);
    }
  }
}
function mathhandler(an1, an2) {
  console.log(an1);
  console.log(an2);
  if (an1.num === an2.num) {
    // console.log(grid.children[an1.num]);
    grid.children[an1.num].src = "images/blank.png";
  } else if (an1.pic.name === an2.pic.name) {
    correctnum++;

    if (correctnum === (1 / 2) * imgs.length) {
      result.innerHTML = "congrats";
    } else {
      result.innerHTML = correctnum;
    }
  } else {
    grid.children[an1.num].src = "images/blank.png";
    grid.children[an2.num].src = "images/blank.png";
  }
  answer = [];
}
```
