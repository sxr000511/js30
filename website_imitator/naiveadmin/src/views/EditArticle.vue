<template>
  <el-form
    @submit.native.prevent="saveArticle"
    ref="form"
    :model="article"
    label-width="80px"
  >
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">确认修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {},
    };
  },
  methods: {
    saveArticle() {
      // console.log(this.article);
      // 调用axios，在baseurl上/articles，向url请求数据，
      // 返回promise处理
      this.$http
        .put(`/articles/${this.$route.params.id}`, this.article)
        .then((res) => {
          // res响应对象
          // 提示信息
          console.log(res.data);
          this.$message({
            message: "更新成功",
            type: "success",
          });

          // 跳转回list
          this.$router.push("/articles/list");
        });
    },
    load() {
      this.$http.get(`/articles/${this.$route.params.id}`).then((res) => {
        this.article = res.data;
      });
    },
  },
  created() {
    this.load();
  },
};
</script>