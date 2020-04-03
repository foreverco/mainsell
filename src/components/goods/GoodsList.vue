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
        <el-button type="primary" @click="toAddGoods">添加商品</el-button>
      </el-row>
      <el-table :data="listData.records" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods.goodsName"></el-table-column>
        <el-table-column label="商品类型" prop="goods.goodsType"></el-table-column>
        <el-table-column label="商品价格" prop="goods.goodsPrice"></el-table-column>
        <el-table-column label="商品库存" prop="goods.goodsStock"></el-table-column>
        <el-table-column
          label="图片信息"
          prop="goodsUrls"
          style="display:flex;justify-content: center"
        >
          <template slot-scope="scope">
            <!-- <span v-for="(item, index) in scope.row.goodsUrls" :key="index">{{item.goodsUrl}}</span> -->
            <img
              v-for="(item, index) in scope.row.goodsUrls"
              :key="index"
              :src="item.goodsUrl"
              style="width:50px;height:50px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="Goodsedit(scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="Goodsdel(scope.row)">删除</el-button>
            <!-- <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="15" :offset="6">
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
    records: [
      {
        title: '哈哈哈',
        date: '2020-03-30',
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
    ],
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
    this.getGoodsList(1)
  },
  methods: {
    toAddGoods() {
      this.$router.push('/goodsList/add')
    },
    async getGoodsList(page, size, p) {
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
      const { data: res } = await this.$http.get('/hurui/goods/goodsList', { params: params })
      console.log(res)
      this.listData = res.data
      console.log(this.listData)
    },
    handleCurrentChange(page) {
      this.getGoodsList(page, this.listData.size)
    },
    handleSizeChange(size) {
      this.getGoodsList(1, size)
    },
    /* 编辑分页数据 */
    Goodsedit(e) {
      console.log(e)
    },
    /* 删除商品数据 */
    async Goodsdel(e) {
      console.log(e.goods.id)
      const res = await this.$http.delete('/hurui/goods/deleteGoods', { Id: e.goods.id })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.row-bg {
  // border:1px solid red;
}
</style>
