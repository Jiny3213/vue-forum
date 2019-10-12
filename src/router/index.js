// 配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入组件,懒加载
const TopicsPanel = () => import('@views/topicsPanel/TopicsPanel.vue')
const TopicPanel = () => import('@views/topicPanel/TopicPanel.vue')
const Login = () => import('@views/login/Login.vue')
const Register = () => import('@views/register/Register.vue')
const Beginner = () => import('../components/Beginner.vue')
const About = () => import('../components/About.vue')
const Create = () => import('@views/create/Create.vue')

// 安装插件
Vue.use(VueRouter)

// 创建路由对象
var routes = [
  {
    path: '/',
    component: TopicsPanel,
    meta: {
      title: '社区首页'
    }
  },
  { 
    path: '/login',
    component: Login,
    meta: {
      title: '登录社区'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册账号'
    }
  },
  {
    path: '/beginner',
    component: Beginner,
    meta: {
      title: '新手入门'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    }
  },
  {
    path: '/topic',
    component: TopicPanel,
    meta: {
      title: '文章'
    }
  },
  {
    path: '/create',
    component: Create,
    meta: {
      title: '新建文章'
    }
  }
]
const router = new VueRouter({
  routes,
  // 默认使用hash带有#号的路径，修改mode变成常见的url
  mode: 'history'
})

// 设置顶端标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

// 导出
export default router