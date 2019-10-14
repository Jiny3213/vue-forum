<template>
  <basic-panel>
    <template #header>
      <span class='main-title'>登录</span>
    </template>
    
    <template>
          <form class="input-form">
            <div class="input-box">
              <label for="username">用户名</label>
              <div class="good-input">
                <input type="text" name="username" v-model="username">
              </div>
            </div>
            <div class="input-box">
              <label for="password">密码</label>
              <div class="good-input">
                <input type="password" name="password" v-model="password">
              </div>
            </div>
            <button class="submit" @click.prevent="submit">登录</button>
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
        username: '',
        password: ''
      }
    },
    components: {
      BasicPanel
    },
    methods: {
      submit() {
        if(!this.username || !this.password) {
          alert('账号或密码不能为空')
          return
        }
        login(this.username, this.password).then(user => {
          if(!user) return
          this.$store.commit('setUser', user)
          this.$router.replace('/')
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
  }
  .input-box{
    margin-bottom: 15px;
    label{
      display: inline-block;
      width: 160px;
      text-align: right;
      margin-right: 20px;
      font-size: $notice-font-size;
    }
    .good-input{
      @include good-input;
      display: inline-block;
    }
  }
  .submit{
    @include basic-button;
    margin-left: 180px;
  }
</style>
