<template>
  <div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"> </el-table-column>
      <el-table-column prop="content" label="内容" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scrope.row obj -->
          <el-button @click="editHandle(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="removeHandle(scope.row._id)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    init() {
      this.$http.get("/articles").then((res) => {
        this.articles = res.data;
      });
    },
    removeHandle(id) {
      this.$http.delete(`/articles/${id}`).then((res) => {
        // 提示信息
        this.$message({
          message: "成功",
          type: "success",
        });
        // 跳转回list
        this.init();
      });
    },
    editHandle(id) {
      this.$router.push(`/articles/${id}/edit`);
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
</style>