<template>
  <basic-panel>
    <template #header>
      <span class='main-title'>登录</span>
    </template>

    <template>
      <form class="input-form">
        <!-- 邮箱 -->
        <good-input label="登录邮箱" label-id="email">
          <input type="text" name="email" v-model="email" id="email">
        </good-input>

        <!-- 密码 -->
        <good-input label="密码" label-id="password">
          <input type="password" name="password" v-model="password" id="password">
        </good-input>

        <!-- 验证码输入 -->
        <good-input label="验证码" label-id="captcha">
          <input type="text" name="captcha" v-model="captcha" id="captcha">
          <template #hint>
            <p v-show="isCaptchaWrong">{{captchaTips}}</p>
          </template>
        </good-input>

        <!-- 验证码图片 -->
        <captcha ref="captcha"/>

        <!-- 提交 -->
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
  import GoodInput from '@components/common/GoodInput'
  import Captcha from '@components/common/Captcha'

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        captcha: '',
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
      // 登录
      submit() {
        if (!this.email || !this.password) {
          alert('登录邮箱或密码不能为空')
          return
        }
        this.$axios.login.login(this.email, this.password, this.captcha)
          .then(res => {
            if (res.data.msg == 'ok') {
              this.isCaptchaWrong = false
              alert('登录成功')
              // 储存token到本地
              localStorage.setItem('token', "Bearer " + res.data.token)
              // 提交用户数据到vuex
              this.$store.commit('setUser', res.data.user)
              this.$router.replace('/')
            }
            // 验证码错误
            else if (res.data.msg == 'captcha wrong') {
              this.isCaptchaWrong = true
              this.captcha = ''
              // 刷新验证码
              this.$refs.captcha.getNewCaptcha()
            } else {
              this.isCaptchaWrong = false
              alert('登录失败，请检查登录邮箱或密码是否正确')
            }
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .main-title {
    @include main-title
  }

  .input-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit-box {
    .submit {
      @include basic-button;
      margin-left: 65px;
    }

    a {
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
