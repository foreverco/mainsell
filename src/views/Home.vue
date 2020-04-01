<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/base_head.gif" width="40" height="40" alt>
        <span>员工后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409bff"
          unique-opened
          :collapse='isCollapse'
          :collapse-transition='false'
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="items.id" v-for="items in menuList" :key="items.id">
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[items.id]"></i>
              <!-- 文本 -->
              <span>{{items.metaTitle}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + item.path" v-for="item in items.children" :key="item.id" @click="saveNavState('/' + item.path)">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{item.metaTitle}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主体 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      /* 左侧菜单数据 */
      menuList: [],
      iconsObj: {
        '329f3a0a5526a8c1570808230bd13ee2': 'iconfont iconxuexiao',
        '074ad7967a84d780654ae10236763662': 'iconfont iconxuexiao',
        '9a40ed8b643ab1a8c38a6565232a765b': 'iconfont icongaojing',
        '466fe80de901ef15622c9e8dad8183d5': 'iconfont icondianxinzhapian',
        '7636d31cd87c19d9a9d7d76b9f9493a9': 'iconfont iconpaichusuo',
        // 'a1940aecf0b5b2a70b39c29265208443': 'iconfont iconxuexiao',
        '346e8f114169584530ba46c939164cdd': 'iconfont iconyiyuan'
      },
      /* 侧边栏是否折叠 */
      isCollapse: false,
      /* 被激活的链接地址 */
      activePath: ''
    }
  },
  created() {
      console.log(123)
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/mgmt/menu?status=0')
      if (res.code !== '200') return this.$message.error(res.message)
      this.menuList = res.data
      // console.log(this.menuList)
    },
    /* 点击按钮切换菜单的折叠于展开 */
    toggleCollapse() {
        this.isCollapse = !this.isCollapse
    },
    /* 保存链接的激活状态 */
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      border-radius: 50%;
    }
  }
}
.el-aside {
  background: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background: #eaedf1;
}
.iconfont {
  margin-right: 10px;
  font-size: 14px;
}
.toggle-button {
  background: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
