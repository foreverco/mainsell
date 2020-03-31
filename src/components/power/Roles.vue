<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
       <!-- 添加角色按钮区 -->
       <el-row>
          <el-col>
             <el-button type='primary'>添加角色</el-button>
          </el-col>
       </el-row>

       <!-- 角色列表区 -->
      <el-table :data='rolesList' border stripe>
         <!-- 展开列 -->
         <el-table-column type='expand'></el-table-column>
         <!-- 索引列 -->
         <el-table-column type='index'></el-table-column>
         <el-table-column label='角色名称' prop='roleName'></el-table-column>
         <el-table-column label='角色描述' prop='remark'></el-table-column>
         <el-table-column label='操作' width='300px'>
            <template>
            <!-- <template slot-scope='scope'> -->
               <el-button size='mini' type="primary" icon="el-icon-edit">编辑</el-button>
               <el-button size='mini' type="danger" icon="el-icon-delete">删除</el-button>
               <el-button size='mini' type="warning" icon="el-icon-setting">分配权限</el-button>
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
         /* 所有角色列表数据 */
         rolesList: []
      }
   },
   created() {
      this.getRoles()
   },
   methods: {
      async getRoles() {
         const { data: res } = await this.$http.get('/mgmt/manager/getInfo')
         console.log(res)
         if (res.code !== '200') return this.$message.error('获取角色列表失败')
         this.rolesList = res.data.manager.roles
      }
   }
}
</script>

<style lang="less" scoped>
</style>
