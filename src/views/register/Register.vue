<template>
  <basic-panel>
    <template #header>
      <span class='main-title'>注册</span>
    </template>
    
    <template>
      <form class="input-form">
        <!-- 邮箱 -->
        <good-input label="注册邮箱" label-id="email">
          <input type="text" name="email" id="email"
          v-model.trim="email" @input="inputEmail">
          <template #hint>
            <p v-show="email">{{emailTips}}</p>
          </template>
        </good-input>
        
        <!-- 昵称 -->
        <good-input label="昵称" label-id='username'>
          <input type="text" name="username" id="username"
          v-model.trim="username" @input="inputUsername"
          placeholder="2-10个字符">
          <template #hint>
            <p v-show="username">{{usernameTips}}</p>
          </template>
        </good-input>
       
        <!-- 密码 -->
        <good-input label="密码" label-id="password">
          <input type="password" name="password" id="password"
          v-model="password" @input="inputPassword"
          placeholder="6-12位字符的密码">
          <template #hint>
            <p v-show="password">{{passwordTips}}</p>
          </template>
        </good-input>
        
        <!-- 再次密码 -->
        <good-input label="再次确认密码" label-id="confirm">
          <input type="password" name="confirm" id="confirm"
          v-model="confirm" @input="inputConfirm"
          placeholder="请再次确认密码">
          <template #hint>
            <p v-show="confirm">{{confirmTips}}</p>
          </template>
        </good-input>
        
        <good-input label="验证码" label-id="captcha">
          <input type="text" id="captcha" v-model="captcha">
          <template #hint>
            <p v-show="isCaptchaWrong">{{captchaTips}}</p>
          </template>
        </good-input>
        
        <!-- 验证码图片 -->
        <captcha/>
        
        <div class="submit-box">
          <button class="submit" @click.prevent="submit">注册</button>
          <a @click="$router.push('/login')">已经注册？前往登录</a>
        </div>
      </form>
    </template>
  </basic-panel>
	
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import Register from '@network/register'
  import GoodInput from '@components/common/GoodInput'
  import Captcha from '@components/common/Captcha'
  
  // 定义防抖函数
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
        captcha: '',
        isUsernameAvailable: false,
        isPasswordAvailable: false,
        isEmailAvailable: false,
        isConfirmAvailable: false,
        usernameTips: '',
        passwordTips: '',
        emailTips: '',
        confirmTips: '',
        captchaTips: '验证码错误！',
        isCaptchaWrong: false
      }
    },
    components: {
      BasicPanel,
      GoodInput,
      Captcha
    },
    methods: {
      // 验证邮箱
      inputEmail: debounce(function() {
        if(!this.email) {
          this.isEmailAvailable = false
        }
        else if(this.email.length > 30) {
          this.isEmailAvailable = false
          this.emailTips = '请输入正确的邮箱！！'
        }
        else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
          this.isEmailAvailable = false
          this.emailTips = '请输入正确的邮箱格式'
        }
        else {
          // 此处发送请求,验证邮箱是否存在
          Register.testExist({
            key: 'email',
            value: this.email
          }).then(res => {
            if(res.data.msg == 'ok') {
              this.isEmailAvailable = true
              this.emailTips = '√'
            }
            else {
              this.isEmailAvailable = false
              this.emailTips = '该邮箱已注册'
            }
          })
        }
      }) ,
      
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
          // 验证昵称是否存在
          Register.testExist({
            key: 'username',
            value: this.username
          }).then(res => {
            if(res.data.msg == 'ok') {
              this.isUsernameAvailable = true
              this.usernameTips = '√'
            }
            else {
              this.isUsernameAvailable = false
              this.usernameTips = '昵称已存在'
            }
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
        // 每次修改密码，都要重新验证confirm
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
      
      // 提交注册数据
      submit() {
        // 验证非空
        if(!this.username || !this.password || !this.email || !this.confirm || !this.captcha) {
          alert('请输入完整注册信息')
        }
        else if(this.isEmailAvailable && this.isUsernameAvailable && this.isPasswordAvailable && this.isConfirmAvailable) {
          // 注册
          Register.register(this.email, this.username, this.password, this.captcha)
            .then(res => {
              if(res.data.msg == 'captcha wrong') {
                // 验证码错误
                this.isCaptchaWrong = true
                this.captcha = ''
              }
              else if(res.data.msg == 'ok') {
                this.isCaptchaWrong = false
                localStorage.setItem('token', "Bearer " + res.data.token)
                // 返回用户数据，保存到vuex中
                this.$store.commit('setUser', res.data.user)
                // 注册成功跳转
                alert('注册成功')
                this.$router.replace('/')
              }
              else {
                this.isCaptchaWrong = false
                // 服务端验证失败
                alert('注册失败，请重试')
                this.refresh()
              }
            })
        }
        else {
          alert('注册信息有误，请检查')
        }
      },
      
      // 清空所有用户输入的数据
      refresh() {
        this.email = ""
        this.username = ""
        this.password = ""
        this.confirm = ""
        this.captcha = ""
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
  // 验证码图片居中
  .captcha {
    margin-left: 60px;
    margin-bottom: 20px;
  }
</style>
