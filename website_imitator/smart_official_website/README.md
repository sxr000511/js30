title: grid1
date: 2021-08-15
tags:

# 仿写

## html 语义化

header section footer 等

## grid 布局

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。
https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

### header

整体 gird 布局，左边
![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/aboutus.JPG?raw=true)

1. 宽度 100vw 视口占全部
2. z-index -》200 使之最高

```
header {
  /* 占满整个浏览器宽度 */
  width: 100vw;
  height: 80px;
  padding: 0 40px;
  /* 栅格布局grid */
  display: grid;
  /* 左边列宽1 右边列宽2 */
  grid-template-columns: 1fr 2fr;
  /* 居中 */
  align-content: center;
  position: relative;
  z-index: 200;
}
header nav {
  /* 内容在单元格里靠end对齐 */
  justify-self: end;
}
```

### glide

用插件 glide.js+anime.js

### aboutus

![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/header.JPG?raw=true)

```
* 关于我们 */
/* 先给整个contentrapper设样式 */
/* 内容区域 */
/* 通用样式 */
.content-wrapper {
  /* 一维排版 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
```

```
section {
  /* 二维 */
  display: grid;
  /* 每个列的对齐方式 */
  justify-items: center;
  max-width: 1280px;
  padding: 0 80px;
}
```

红色短线用伪元素

```
/* 红色条：伪元素 */
.title1::after {
  content: "";
  display: block;
  width: 80%;
  height: 4px;
  background-color: var(--primary-color);
  margin-top: 14px;
  /* 移动到中间，80-》右移10%，左右都10% */
  transform: translateX(10%);
}
```

![](https://github.com/sxr000511/js_minidemo/blob/master/website_imitator/smart_official_website/note/feature.JPG?raw=true)
featues 是六个 feature 的集合
用 grid 分成六个 area
关注下分行分列的写法

```
.features {
  /* grid布局 */
  display: grid;
  /* 重复几次，重复的值  1fr：容器宽度的1/3*/
  grid-template-columns: repeat(3, 1fr);
  /* 两行 */
  grid-template-rows: 126px 126px;
  /* 列间空隙 */
  column-gap: 5vw;
}

```

feature 内部也是 grid 布局，分为 2 行 2 列
左侧整列用于 icon
右侧整列分上下用于标签 和 p

```
/* 每一个业务 */

.feature {
  /* grid */
  display: grid;
  /* gird-area布局 */
  /* 自定义行列名字 */
  grid-template-areas:
    "icon title"
    "icon content";
  /* 2列 */
  grid-template-columns: 60px 1fr;
  /* 2行 */
  /* 1/4 -- 3/4 */
  grid-template-rows: 1fr 3fr;
}

```

area 的引用：font-szie 可以控制 icon 的大小

```
.feature i.fas {
  /* 图标 */
  /* 引用，放在左上 */
  grid-area: icon;
  font-size: 34px;
  color: var(--primary-color);
}

```
