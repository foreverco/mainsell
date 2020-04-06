<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>栏目菜单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-row>
      <el-col :span="10">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="title">菜单栏</span>
            <el-button
              style="float: right; padding: 3px 0 ; margin-left: 20px"
              type="text"
              :permission="'sort'"
              @click="saveMenuChange"
            >保存排序</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="resetMenu">重置</el-button>
          </div>
          <el-tree :data="menuList" :props="treeProps" draggable>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <!-- <span>{{ data.type }}</span> -->
              <span>
                <el-button
                  type="text"
                  v-if="data.type !== 'PAGE'"
                  size="mini"
                  @click="() => append(data)"
                >增加</el-button>
                <el-button
                  type="text"
                  v-if="data.id != 'root' && ( !data.children || data.children.length == 0) "
                  size="mini"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>456</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      /* 树形控件的属性绑定对象 */
      treeProps: {
        children: 'children',
        label: 'metaTitle'
      }
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('/api/mgmt/menu?status=0')
      console.log(res)
      if (res.code !== '200') {
        return this.$message.error('获取菜单列表失败')
      }
      this.menuList = [
        {
          id: 'root',
          metaTitle: '根',
          children: res.data
        }
      ]
    },
    get(e) {
      console.log(e)
    },
    saveMenuChange() {},
    resetMenu() {}
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
