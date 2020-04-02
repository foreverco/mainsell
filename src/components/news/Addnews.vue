<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区 -->
      <el-alert title="添加新闻信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条区 -->
      <el-steps :space="200" :active="0" finish-status="success" align-center>
        <el-step title="添加标题"></el-step>
        <el-step title="添加日期"></el-step>
        <el-step title="添加图片"></el-step>
        <el-step title="添加内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped></style>
