<template>
  <basic-panel>
    <template #header>
      <span class='main-title'>登录</span>
    </template>
    
    <template>
          <form class="input-form">
            <div class="input-box">
              <label for="email">注册邮箱</label>
              <div class="good-input">
                <input type="text" name="email" 
                v-model.trim="email" @input="inputEmail">
              </div>
              <!-- 提示信息 -->
              <span class="alert" v-show="email">{{emailTips}}</span>
            </div>
            
            <div class="input-box">
              <label for="username">昵称</label>
              <div class="good-input">
                <input type="text" name="username" 
                v-model.trim="username" @input="inputUsername"
                placeholder="2-10个字符">
              </div>
              <!-- 提示信息 -->
              <span class="alert" v-show="username">{{usernameTips}}</span>
            </div>
            
            <div class="input-box">
              <label for="password">密码</label>
              <div class="good-input">
                <input type="password" name="password" 
                v-model="password" @input="inputPassword"
                placeholder="6-12位字符的密码">
              </div>
              <!-- 提示信息 -->
              <span class="alert" v-show="password">{{passwordTips}}</span>
            </div>
            
            <div class="input-box">
              <label for="confirm">再次确认密码</label>
              <div class="good-input">
                <input type="password" name="confirm" 
                v-model="confirm" @input="inputConfirm"
                placeholder="请再次确认密码">
              </div>
              <!-- 提示信息 -->
              <span class="alert" v-show="confirm">{{confirmTips}}</span>
            </div>
            <button class="submit" @click.prevent="submit">注册</button>
          </form>
    </template>
  </basic-panel>
	
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import Register from '@network/register'
  
  function debounce(fn, delay=300) {
    var timer = null
    return function() {
      if(timer) {
        clearTimeout(timer)
      }
      // 这里取到的this是vue实例
      timer = setTimeout(fn.bind(this), delay)
    }
  }
  
	export default {
    name: 'register',
		data() {
			return {
        email: '',
        username: '',
        password: '',
        confirm: '',
        isUsernameAvailable: false,
        isPasswordAvailable: false,
        isEmailAvailable: false,
        isConfirmAvailable: false,
        usernameTips: '',
        passwordTips: '',
        emailTips: '',
        confirmTips: ''
      }
    },
    components: {
      BasicPanel
    },
    methods: {
      // 验证邮箱
      inputEmail() {
        if(!this.email) {
          this.isEmailAvailable = false
        }
        else if(this.email.length > 30) {
          this.isEmailAvailable = false
          this.emailTips = '请输入正确的邮箱！！'
        }
        else if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
          this.isEmailAvailable = true
          this.emailTips = '√'
        }
        else {
          this.isEmailAvailable = false
          this.emailTips = '请输入正确的邮箱格式'
        }
      },
      //验证昵称
      inputUsername: debounce(function() {
        if(!this.username) {
          this.isUsernameAvailable = false
        }
        else if(this.username.length < 2 || this.username.length > 10) {
          this.isUsernameAvailable = false
          this.usernameTips = '昵称长度应为2-10个字符'
        }
        else if(/\s/.test(this.username)) {
          this.isUsernameAvailable = false
          this.usernameTips = '昵称不应包含空格'
        }
        else {
          Register.testUsername(this.username)
            .then(res => {
              var available = res.data.available
              if(!available) {
                this.isUsernameAvailable = false
                this.usernameTips = '昵称重复'
              }
              else {
                this.isUsernameAvailable = true
                this.usernameTips = '√'
              }
              // 测试debounce效果
              // console.log(res.data.available)
            }) 
        }
      }),
      // 验证密码
      inputPassword() {
        if(!this.password) {
          this.isPasswordAvailable = false
        }
        else if(this.password.length < 6 || this.password.length > 12) {
          this.isPasswordAvailable = false
          this.passwordTips = '密码长度应为6-12字符'
        }
        else if(/\s/.test(this.password)) {
          this.isPasswordAvailable = false
          this.passwordTips = '密码不应包含空格'
        }
        else {
          this.isPasswordAvailable = true
          this.passwordTips = '√'
        }
        this.inputConfirm()
      },
      // 验证再次输入的密码
      inputConfirm() {
        if(!this.confirm) {
          this.isConfirmAvailable = false
        }
        else if(this.password == this.confirm) {
          this.isConfirmAvailable = true
          this.confirmTips = '√'
        }
        else if(this.confirm !== this.password) {
          this.isConfirmAvailable = false
          this.confirmTips = '两次输入密码不一致'
        }
      },
      submit() {
        // 验证非空
        if(!this.username || !this.password || !this.email || !this.confirm) {
          alert('请输入完整注册信息')
          return
        }
        else if(this.isEmailAvailable && this.isUsernameAvailable && this.isPasswordAvailable && this.isConfirmAvailable) {
          // 注册
          Register.register(this.email, this.username, this.password)
            .then(user => {
              if(user) {
                this.$store.commit('setUser', user)
                // 注册成功跳转
                alert('注册成功')
                this.$router.replace('/')
              }
              else {
                alert('注册失败，请重试')
                this.refresh()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
        else {
          alert('注册信息有误，请检查')
        }
      },
      refresh() {
        this.email = ""
        this.username = ""
        this.password = ""
        this.confirm = ""
      }
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
    .alert{
      margin-left: 10px;
    }
  }
  .submit{
    @include basic-button;
    margin-left: 180px;
  }
</style>
