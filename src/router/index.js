// 配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入组件,懒加载
const TopicsPanel = () => import('@views/topicsPanel/TopicsPanel.vue')
const TopicPanel = () => import('@views/topicPanel/TopicPanel.vue')
const Login = () => import('@/views/login/Login.vue')
const Register = () => import('@views/register/Register.vue')
const About = () => import('@views/about/About.vue')
const Create = () => import('@views/create/Create.vue')
const Test = () => import('@views/test/Test.vue')

const Profile = () => import('@views/profile/Profile.vue')
const ProfileAvatar = () => import('@views/profile/ProfileAvatar.vue')
const ProfileMain = () => import('@views/profile/ProfileMain.vue')
const ProfileMod = () => import('@views/profile/ProfileMod.vue')

const SearchPanel = () => import('@views/search/SearchPanel.vue')
const NotFound = () => import('@views/notFound/NotFound.vue')

// // 安装插件
Vue.use(VueRouter)

// 引入vuex，检查是否登录
// import store from '../store/index.js'

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
    name: 'login',
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
    path: '/test',
    component: Test,
    meta: {
      title: '测试本站'
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
    path: '/topic/:id',
    name: 'topic',
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
    },
    // beforeEnter: (to, from, next) => {
    //   if(router.app.$store.state.user.username) {
    //     next()
    //   }
    //   else {
    //     next('/login')
    //     alert('请先登录')
    //   }
    // }
  },
  {
    path: '/profile',
    redirect: '/profile/main',
    component: Profile,
    meta: {
      title: '我的资料'
    },
    children: [
      {
        path: 'main',
        component: ProfileMain,
        meta: {
          title: '我的资料'
        },
      },
      {
        path: 'avatar',
        component: ProfileAvatar,
        meta: {
          title: '修改头像'
        },
      },
      {
        path: 'mod',
        component: ProfileMod,
        meta: {
          title: '修改密码'
        }
      }
    ]
  },
  {
    path: '/search/:query',
    component: SearchPanel,
    name: 'search',
    meta: {
      title: '搜索'
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// // 设置顶端标题
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   next()
// })

// 导出
export default router
