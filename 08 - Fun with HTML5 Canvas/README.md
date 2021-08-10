# canvas

通过这个例子顺道学习一下 canvas

## 绘制矩形

![xandy](https://www.runoob.com/wp-content/uploads/2018/12/Canvas_default_grid.png)

​canvas 只支持一种原生的图形绘制：矩形。
所有其他图形都至少需要生成一种路径 (path)。

canvast 提供了三种方法绘制矩形：

1、fillRect(x, y, width, height)：绘制一个填充的矩形。
2、strokeRect(x, y, width, height)：绘制一个矩形的边框。
3、clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变的完全透明。

## 绘制路径

```
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
      ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
    ctx.stroke(); //描边。stroke不会自动closePath()
}
draw();
```

```
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);

    ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
}
draw();
```

## 绘制圆弧

### 1、arc(x, y, r, startAngle, endAngle, anticlockwise):

以(x, y) 为圆心，以 r 为半径，从 startAngle 弧度开始到 endAngle 弧度结束。anticlosewise 是布尔值，true 表示逆时针，false 表示顺时针(默认是顺时针)。

注意：

这里的度数都是弧度。

0 弧度是指的 x 轴正方向。

radians=(Math.PI/180)\*degrees //角度转换成弧度

```
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(150, 150, 40, 0, Math.PI, false);
    ctx.fill();

}
draw();
```

![arc](https://www.runoob.com/wp-content/uploads/2018/12/2218794221-5b74dd8f43f98_articlex.png)

### 2.arcTo(x1, y1, x2, y2, radius)

根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

```
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
      //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
    ctx.arcTo(200, 50, 200, 200, 100);
    ctx.lineTo(200, 200)
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(50, 50, 10, 10);
    ctx.rect(200, 50, 10, 10)
    ctx.rect(200, 200, 10, 10)
    ctx.fill()
}
draw();
```

![](https://www.runoob.com/wp-content/uploads/2018/12/3556678928-5b74dd8f1bd2a_articlex.png)
这个方法可以这样理解。绘制的弧形是由两条切线所决定。

第 1 条切线：起始点和控制点 1 决定的直线。

第 2 条切线：控制点 1 和控制点 2 决定的直线。

​ 其实绘制的圆弧就是与这两条直线相切的圆弧。

## 绘制贝塞尔曲线

## 样式和颜色

fillStyle = color 设置图形的填充颜色
strokeStyle = color 设置图形轮廓的颜色
linewidth
linecap
linejoinsetlinedash

## 文本

fillText(text, x, y [, maxWidth]) 在指定的 (x,y) 位置填充指定的文本，绘制的最大宽度是可选的。

strokeText(text, x, y [, maxWidth]) 在指定的 (x,y) 位置绘制文本边框，绘制的最大宽度是可选的。

## 绘制图片

插入
缩放
切片

## etc

合成
裁剪
保存状态

## 动画

动画的基本步骤
清空 canvas 再绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是 clearRect() 方法。

保存 canvas 状态 如果在绘制的过程中会更改 canvas 的状态(颜色、移动了坐标原点等),又在绘制每一帧时都是原始状态的话，则最好保存下 canvas 的状态

绘制动画图形这一步才是真正的绘制动画帧

恢复 canvas 状态如果你前面保存了 canvas 状态，则应该在绘制完成一帧之后恢复 canvas 状态。

### 绘制动画方法

一般用到下面三个方法：

setInterval()
setTimeout()
requestAnimationFrame()
