<template>
  <basic-panel>
    <template #header>
      <span class='main-title'>登录</span>
    </template>
    
    <template>
          <form class="input-form">
            <div class="input-box">
              <label for="email">登录邮箱</label>
              <div class="right-box">
                <div class="good-input">
                  <input type="text" name="email" v-model="email" id="email">
                </div>
              </div>
            </div>
            <div class="input-box">
              <label for="password">密码</label>
              <div class="right-box">
                <div class="good-input">
                  <input type="password" name="password" v-model="password" id="password">
                </div>
              </div>
            </div>
            <div class="submit-box">
              <button class="submit" @click.prevent="submit">登录</button>
              <a @click="$router.push('/register')">未有账号？前往注册</a>
            </div>
          </form>
    </template>
  </basic-panel>
	
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import {login} from '@network/login'
	export default {
    name: 'login',
		data() {
			return {
        email: '',
        password: ''
      }
    },
    components: {
      BasicPanel
    },
    methods: {
      // 登录
      submit() {
        if(!this.email || !this.password) {
          alert('登录邮箱或密码不能为空')
          return
        }
        login(this.email, this.password)
          .then(res => {
            if(res.data.msg == 'ok') {
              alert('登录成功')
              // 储存token到本地
              localStorage.setItem('token', "Bearer " + res.data.token)
              // 提交用户数据到vuex
              this.$store.commit('setUser', res.data.user)
              this.$router.replace('/')
            }
            else {
              alert('登录失败，请检查登录邮箱或密码是否正确')
            }
          })
      },
    }
	}
</script>

<style lang="scss" scoped>
  .main-title{
    @include main-title
  }
  .input-form{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input-box{
    margin-bottom: 10px;
    display: flex;
    label{
      width: 100px;
      text-align: right;
      margin-right: 10px;
      margin-left: -50px;
      font-size: 16px;
      padding-top: 3px;
    }
    .right-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      .good-input{
        @include good-input;
      }
      .alert{
        margin-top: 10px;
      }
    }
  }
  .submit-box{
    .submit{
      @include basic-button;
      margin-left: 65px;
    }
    a{
      margin-left: 10px;
      color: #1E88E5;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
