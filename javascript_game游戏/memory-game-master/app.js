document.addEventListener("DOMContentLoaded", () => {
  //一共六种图片，6对，共12个item
  const imgs = [
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
  ];

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
    //   这个this是window
    // console.log(this);
    // 如果写箭头函数，this就是第二个pic
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
});
