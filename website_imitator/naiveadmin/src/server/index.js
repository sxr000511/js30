const express = require("express");
const app = express();

// cors允许跨域
app.use(require("cors")());
// 实别req的json数据
app.use(express.json());
// mongosse数据库
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/naive-admin-db", {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

// mongoose模型Ariticle
//创建一个Schema对象，定义字段
const Sche = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
});
const Article = mongoose.model("Article", Sche);

// 配置
app.get("/", async (req, res) => {
  res.send("main");
});

// 后端接口地址/api/articles，前端向这个url请求数据
app.post("/api/articles", async (req, res) => {
  const newart = await Article.create(req.body);
  // newart.title = req.title
  // newart.content = req.content
  res.send(newart);
});
// 获得文章列表
// 虽然同名但不会影响
app.get("/api/articles", async (req, res) => {
  const arts = await Article.find();

  res.send(arts);
});
// 删除：肯定要传入id,:id用来匹配
app.delete("/api/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status: true,
  });
});

// 编辑article页面，获得数据
app.get("/api/articles/:id", async (req, res) => {
  const art = await Article.findById(req.params.id);
  res.send(art);
});

// 修改article item
app.put("/api/articles/:id", async (req, res) => {
  const art = await Article.findByIdAndUpdate(req.params.id, req.body);
  res.send(art);
});

app.listen(3001, () => {
  console.log("3001 is listening");
});
