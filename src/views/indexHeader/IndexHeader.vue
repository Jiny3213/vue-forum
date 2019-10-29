<template>
	<!-- 头部模块 -->
  <div class="index-header">
    <!-- 限制元素堆积在中间 -->
    <div class="limit-box">
      <!-- 可以返回首页的logo -->
      <div class="logo" @click="GotoIndex"></div>
      
      <!-- 搜索栏 -->
      <div class="search-box">
        <form action="" @submit.prevent="search">
          <input type="text" v-model="searchText" placeholder="搜索文章">
        </form>
      </div>
      <!-- 移动端显示：用户菜单 -->
      <div class="menu" @click="menu"></div>
      
      <transition name="slide">
        <ul class="nav" v-show="isNavShow">
          <li><a @click.prevent="GotoIndex">首页</a></li>
          <!-- <li><a @click.prevent="test">测试本站</a></li> -->
          <li><a @click.prevent="about">关于</a></li>
          <li><a @click.prevent="register" v-show="!$store.state.user.username">注册</a></li>
          <li><a @click.prevent="login" v-show="!$store.state.user.username">登录</a></li>
          <li><a @click.prevent="logout" v-show="$store.state.user.username">退出登录</a></li>
          <li><a @click.prevent="my" v-show="$store.state.user.username">我的</a></li>
        </ul>
      </transition>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'index-header',
		data() {
			return {
        // 搜索内容
        searchText: null,
        // 是否显示菜单栏
        isNavShow: true
			}
		},
    created() {
      // 如果是手机端，则默认不显示菜单栏
      var isMobile = matchMedia('(max-width: 825px)').matches
      if(isMobile) this.isNavShow = false
    },
		methods: {
      // 统一使用replace
      router(path) {
        if(this.$route.path == path) return
        this.$router.replace(path)
      },
      // 跳转到登录页
      login() {
        if(this.$route.path == '/login') return
        this.$router.replace({
          name: 'login'
        })
      },
      // 跳转到注册页
      register() {
        this.router('/register')
      },
      // 返回首页
      GotoIndex() {
        this.router('/')
      },
      // 跳转到测试页
      test() {
        this.router('/test')
      },
      // 跳转到关于页
      about() {
        this.router('/about')
      },
      // 登出
      logout() {
        localStorage.removeItem('token')
        this.$store.commit('logout')
      },
      // 我的
      my() {
        this.router('/profile')
      },
      // 搜索
      search() {
        if(!this.searchText) {
          this.$router.push('/')
        }
        else if(this.$route.params.query != this.searchText) {
          this.$router.push({
            name: 'search',
            params: {query: this.searchText}
          })
        }
      },
      // 展示或隐藏移动端的菜单栏
      menu() {
        this.isNavShow = !this.isNavShow
      }
    }
	}
</script>

<style lang="scss" scoped>
  // vue动画效果
  @keyframes show-nav{
    from {height: 0;}
    to {height: 50px;}
  }
  .slide-enter, .slide-leave-to{
    height: 0;
  }
  .slide-enter-to, .slide-leave{
    height: 50px;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 1s;
  }
  // 定义背景颜色
  $bgc: #42B983;
  
  .index-header{
    width: 100%;
    min-height: 50px;
    background-color: $bgc;
    box-sizing: border-box;
    padding: 0 70px 0 70px;
    &::after{
      content: '';
      display: block;
      clear: left;
    }
  }
  .limit-box{
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .logo{
    float: left;
    height: 50px;
    width: 150px;
    cursor: pointer;
    background: url('~@assets/img/raspberry_logo.png') no-repeat center center;
    background-size: 150px;
  }
  
  .search-box{
    float: left;
    height: 30px;
    margin: 10px 0 0 10px;
    border-radius: 15px;
    background-color: #fff;
    background: #fff url(~@assets/img/search.png) no-repeat 5px 5px;
    input{
      background: none;
      border: none;
      outline: none;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      margin: 5px 0 0 25px;
    }
    &:hover{
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    }
  }
  .menu{
    display: none;
  }
  .nav {
    float: right;
    li {
      float: left;
      a{
        line-height: 50px;
        padding: 0 10px 0 10px;
        display: block;
        height: 100%;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
    }
  }
  // 移动端
  @media (max-width: $action-width) {
    .index-header{
      padding: 0;
    }
    .logo{
      width: 50px;
      height: 50px;
      background: url('~@assets/img/small-logo1.png') no-repeat center center;
      background-size: 40px;
    }
    // 导航栏
    .nav{
      float: none;
      clear: left;
      overflow: hidden;
      display: flex;
      justify-content: center;
      &::after{
        content: '';
        display: block;
        clear: both;
      }
    }
    // 菜单按钮
    .menu{
      display: block;
      float: right;
      background: url('~@assets/img/svg/menu.svg') no-repeat center center;
      height: 50px;
      width: 50px;
      background-size: 40px;
      cursor: pointer;
    }
  }
</style>