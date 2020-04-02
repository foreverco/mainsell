<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-button type='primary' @click='toAddGoods'>添加商品</el-button>
      </el-row>
      <el-table :data="newsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="新闻标题" prop="title"></el-table-column>
        <el-table-column label="新闻日期" prop="date"></el-table-column>
        <el-table-column label="图片信息" prop="imgUrlList" width='150' style='display:flex;justify-content: center'>
          <template slot-scope="scope">
            <img v-for="(item, index) in scope.row.imgUrlList" :key="index" :src="item.imgUrl" style='width:50px;height:50px'>
          </template>
        </el-table-column>
         <el-table-column label='操作' width='200px'>
            <template>
            <!-- <template slot-scope='scope'> -->
               <el-button size='mini' type="primary" icon="el-icon-edit">编辑</el-button>
               <el-button size='mini' type="danger" icon="el-icon-delete">删除</el-button>
               <!-- <el-button size='mini' type="warning" icon="el-icon-setting">分配权限</el-button> -->
            </template>
         </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [
        {
          title: '哈哈哈',
          date: '2020-03-30',
          imgUrlList: [
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oRNOAI0PrAABnEUNmlCM217.jpg' },
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          imgUrlList: [
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' },
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          imgUrlList: [
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' },
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          imgUrlList: [
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' },
            { imgUrl: 'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg' }
          ]
        }
      ]
    }
  },
  created() {},
  methods: {
    toAddGoods() {
      this.$router.push('/goodsList/add')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
