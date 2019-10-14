<template>
	<!-- 头部模块 -->
  <div class="index-header">
    <div class="limit-box">
      <!-- 可以返回首页的logo -->
      <img class="logo" src="~@assets/img/raspberry_logo.png" alt="logo" @click="GotoIndex">
      
      <!-- 搜索栏 -->
      <div class="search-box">
        <form action="" @submit.prevent="search">
          <input type="text" v-model="searchText" placeholder="搜索">
        </form>
      </div>
      
      <ul class="nav">
        <li><a @click.prevent="GotoIndex">首页</a></li>
        <li><a @click.prevent="beginner">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a @click.prevent="about">关于</a></li>
        <li><a @click.prevent="register" v-show="!$store.state.user.username">注册</a></li>
        <li><a @click.prevent="login" v-show="!$store.state.user.username">登录</a></li>
        <li><a @click.prevent="logout" v-show="$store.state.user.username">退出登录</a></li>
      </ul>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'index-header',
		data() {
			return {
        searchText: null
			}
		},
		methods: {
      router(path) {
        if(this.$route.path == path) return
        this.$router.replace(path)
      },
      login() {
        this.router('/login')
      },
      register() {
        this.router('/register')
      },
      GotoIndex() {
        this.router('/')
      },
      beginner() {
        this.router('/beginner')
      },
      about() {
        this.router('/about')
      },
      logout() {
        localStorage.removeItem('token')
        this.$store.commit('logout')
      },
      search() {
        alert(`搜索成功，你搜索的内容是 "${this.searchText}"\n但是很遗憾，搜索功能还没有实装QAQ`)
      }
    }
	}
</script>

<style scoped>
	.index-header{
    width: 100%;
		min-height: 50px;
		background-color: #42B983;
    box-sizing: border-box;
    padding: 0 70px 0 70px;
	}
  /* 限制宽度 */
  .limit-box{
    max-width: 1400px;
    margin: 0 auto;
  }
  
	.logo{
		float: left;
		height: 50px;
    cursor: pointer;
	}
	.title{
		float: left;
		margin-right: 20px;
		font-size: 20px;
		line-height: 50px;
	}

  
  .nav{
    float: right;
  }
  .nav li{
    float: left;
  }
  .nav li a{
    line-height: 50px;
    padding: 0 10px 0 10px;
    display: block;
    height: 100%;
    cursor: pointer;
  }
  .nav li a:hover{
    color: #fff;
  }
</style>

<style lang="scss" scoped>
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
  }
</style>