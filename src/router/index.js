import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import NewsList from '../components/news/NewsList.vue'
import Addnews from '../components/news/Addnews.vue'
import Goods from '../components/goods/GoodsList.vue'
import Addgoods from '../components/goods/AddGoods.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      /* 用户管理 */
      {
        path: '/user',
        component: Users
      },
      /* 权限列表 */
      {
        path: '/permission',
        component: Rights
      },
       /* 角色列表 */
       {
        path: '/role',
        component: Roles
      },
       /* 新闻列表 */
       {
        path: '/newsmsg',
        component: NewsList
      },
      /* 添加新闻 */
      {
        path: '/newsmsg/add',
        component: Addnews
      },
       /* 商品列表 */
       {
        path: '/goodsList',
        component: Goods
      },
      /* 添加商品 */
      {
        path: '/goodsList/add',
        component: Addgoods
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  // next() 直接放行 next('/login') 强制跳转
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
