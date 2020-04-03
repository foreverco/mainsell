<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-button type="primary" @click="toAddNews">添加新闻</el-button>
      </el-row>
      <el-table :data="newsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="新闻标题" prop="carno"></el-table-column>
        <el-table-column label="新闻日期" prop="createTime">
          <!-- <i class="el-icon-time"></i> -->
        </el-table-column>
        <el-table-column label="新闻内容" prop="reasion"></el-table-column>
        <el-table-column
          label="图片信息"
          prop="imgUrlList"
          width="300"
          style="display:flex;justify-content: center"
        >
          <!-- <template slot-scope="scope">
            <img
              v-for="(item, index) in scope.row.imgUrlList"
              :key="index"
              :src="item.imgUrl"
              style="width:50px;height:50px"
            />
          </template>-->
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <!-- <template slot-scope='scope'> -->
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <!-- <el-button size='mini' type="warning" icon="el-icon-setting">分配权限</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-row>
      <el-col>
        <PagingQuery
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="newsList.total"
          :size="newsList.size"
          :current="newsList.current"
        ></PagingQuery>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PagingQuery from '@/components/pagination/Pagination'
const baseListData = () => {
  return {
    records: [],
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  }
}
export default {
  data() {
    return {
      listData: baseListData(),
      newsList: [
        {
          title: '哈哈哈',
          date: '2020-03-30',
          context: '',
          imgUrlList: [
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oRNOAI0PrAABnEUNmlCM217.jpg'
            },
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          context: '',
          imgUrlList: [
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            },
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          context: '',
          imgUrlList: [
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            },
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            }
          ]
        },
        {
          title: '哈哈哈',
          date: '2020-03-30',
          context: '',
          imgUrlList: [
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            },
            {
              imgUrl:
                'http://192.168.1.187/group1/M00/00/04/wKgBu15oncSAEmKMAABa1uGUo-k756.jpg'
            }
          ]
        }
      ]
    }
  },
  components: {
    PagingQuery
  },
  created() {},
  mounted() {
    this.getNewsList(1)
  },
  methods: {
    toAddNews() {
      this.$router.push('/newsmsg/add')
    },
    async getNewsList(page, size, p) {
      if (page) {
        this.listData.current = page
      }
      if (size) {
        this.listData.size = size
      }
      const params = {
        page: this.listData.current,
        pageSize: this.listData.size
      }
      if (p) {
        for (const item in p) {
          params[item] = p[item]
          delete params.startEndTime
        }
      }
      const res = await this.$http.get('/hurui/goods/goodsList')
      console.log(res)
      this.listData = res.data
    },
    handleCurrentChange(page) {
      this.getNewsList(page, this.listData.size)
    },
    handleSizeChange(size) {
      this.getNewsList(1, size)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
