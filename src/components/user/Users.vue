<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.personName"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialog = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="personName"></el-table-column>
        <el-table-column label="工号" prop="policeCode"></el-table-column>
        <el-table-column label="地址" prop="position"></el-table-column>
        <el-table-column label="入职日期" prop="createTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.oraganizeId" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!-- {{scope.row.personName}} -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click='delUser(scope.row.id)'></el-button>
            <!-- 分配角色 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="用户名" prop="personName">
          <el-input v-model="addForm.personName"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="policeCode">
          <el-input v-model="addForm.policeCode"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="position">
          <el-input v-model="addForm.position"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="createTime">
          <el-input v-model="addForm.createTime"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialog" width="50%" @close="editDialogClosed">
      <el-form
        :rules="editFormRules"
        :model='editForm'
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="personName">
          <el-input v-model="editForm.personName" :disabled='true'></el-input>
        </el-form-item>
         <el-form-item label="地址" prop="position">
          <el-input v-model="editForm.position"></el-input>
        </el-form-item>
         <el-form-item label="入职日期" prop="createTime">
          <el-input v-model="editForm.createTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    /* 验证邮箱的规则 */
    var checkEmail = (rule, value, cb) => {
      /* 验证邮箱的正则表达式 */
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        /* 合法的邮箱 */
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    /* 验证手机号的规则 */
    var checkPhone = (rule, value, cb) => {
      /* 验证手机号的正则表达式 */
      const regPhone = /^1[3|4|5|7|8][0-9]{9}$/
      if (regPhone.test(value)) {
        /* 合法的手机号 */
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      /* 获取用户列表的参数对象 */
      queryInfo: {
        oraganizeId: '',
        // 当前页数
        page: 1,
        // 当前每页显示几条数据
        pageSize: 5,
        personName: '',
        policeCode: '',
        id: ''
      },
      userList: [],
      total: 0,
      /* 控制添加人员对话框的显示隐藏 */
      addDialog: false,
      /* 添加用户的表单数据 */
      addForm: {
        personName: '',
        policeCode: '',
        position: '',
        createTime: ''
      },
      /* 添加表单验证规则对象 */
      addFormRules: {
        personName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度3-10个字符之前',
            trigger: 'blur'
          }
        ],
        policeCode: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '工号长度1-10个字符之前',
            trigger: 'blur'
          }
        ],
        position: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请输入入职日期', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      /* 控制修改用户对话框的显示隐藏 */
      editDialog: false,
      /* 需要编辑的用户信息 */
      editForm: {
        personName: '',
        policeCode: '',
        position: '',
        createTime: ''
      },
      /* 编辑表单验证规则 */
      editFormRules: {
         position: [
          { required: true, message: '请输入地址11', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请输入入职日期', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/mgmt/PersonStructure', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.code !== '200') return this.$message.error('获取用户列表失败')
      this.userList = res.data.records
      this.total = res.data.total
    },
    /* 监听pageSize改变的事件 */
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    /* 监听页码值改变的事件 */
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getUserList()
    },
    /* 监听swich开关状态的改变 */
    async userStateChange(userInfo) {
      // console.log(userInfo)
      const params = {}
      params.oraganizeId = userInfo.oraganizeId
      params.id = userInfo.id
      console.log(params)
      const { data: res } = await this.$http.post(
        '/mgmt/PersonStructure',
        params
      )
      console.log(res)
      if (res.code !== '200') {
        userInfo.oraganizeId = !userInfo.oraganizeId
        return this.$message.error('更新状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    /* 监听添加用户对话框的函数 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    /* 点击按钮添加新用户 */
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return false
        /* 可以发起添加用户的网络请求 */
        const params = this.addForm
        params.id = Number(
          Math.random()
            .toString()
            .substr(3, length) + Date.now()
        ).toString(5)
        const { data: res } = await this.$http.put(
          '/mgmt/PersonStructure',
          params
        )
        if (res.code !== '200') {
          return this.$message.error('用户添加失败')
        }
        /* 隐藏用户的对话框 */
        this.addDialog = false
        /* 重新获取用户列表数据 */
        this.getUserList()
        return this.$message.success('用户添加成功')
      })
    },
    /* 展示修改用户信息对话框 */
    showEditDialog(editmsg) {
      this.editDialog = true
      this.editForm = editmsg
    },
    /* 关闭对话框重置修改数据 */
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    /* 提交修改用户信息 */
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
      console.log(valid)
      if (!valid) return false
      const params = this.editForm
      console.log(params)
      const { data: res } = await this.$http.post('/mgmt/PersonStructure', params)
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('用户信息修改失败')
      }
      this.editDialog = false
      this.getUserList()
      return this.$message.success('用户信息修改成功')
      })
    },
    /* 删除用户信息 */
    async delUser(id) {
      /* 弹框询问用户是否删除数据 */
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        /* 如果点击确认 返回 confirm 字符串 */
        /* 如果点击取消 返回 cancel 字符串 */
        console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已经取消删除')
        }
        console.log('确认删除')

     const iditem = {}
     iditem.id = id
     const ids = []
     ids.push(iditem)
     console.log(ids)
      const { data: res } = await this.$http.delete('/mgmt/PersonStructure/del', {
        data: ids
      })
      if (res.code !== '200') {
        return this.$message.error('删除用户失败')
      }
        this.getUserList()
      return this.$message.success('删除用户成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
