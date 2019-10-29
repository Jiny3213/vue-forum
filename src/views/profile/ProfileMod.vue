<template>
  <div class="porfile-mod">
    <form class="input-form">
      <div class="input-box">
        <label for="oldpwd">旧密码</label>
        <div class="right-box">
          <div class="good-input">
            <input type="password" name="oldpwd" v-model="oldpwd" id="oldpwd">
          </div>
        </div>
      </div>
      <div class="input-box">
        <label for="newpwd">新密码</label>
        <div class="right-box">
          <div class="good-input">
            <input type="password" name="newpwd" v-model="newpwd" id="newpwd" @input="inputNewpwd">
          </div>
          <p class="alert" v-show="newpwd">{{newpwdTips}}</p>
        </div>
      </div>
      <div class="input-box">
        <label for="confirm">确认新密码</label>
        <div class="right-box">
          <div class="good-input">
            <input type="password" name="confirm" v-model="confirm" id="confirm" @input="inputConfirm">
          </div>
          <p class="alert" v-show="confirm">{{confirmTips}}</p>
        </div>
      </div>
      <div class="submit-box">
        <button class="submit" @click.prevent="submit">修改密码</button>
      </div>
    </form>
  </div>
</template>

<script>
  import {modPwd} from '@network/sendData.js'
  
  export default {
    name: 'profile-mod',
    data() {
      return {
        oldpwd: '',
        newpwd: '',
        confirm: '',
        isPasswordAvailable: false,
        isConfirmAvailable: false,
        newpwdTips: null,
        confirmTips: null
      }
    },
    methods: {
      submit() {
        if(this.isConfirmAvailable && this.isPasswordAvailable && this.oldpwd) {
          if(this.oldpwd == this.newpwd) {
            alert('修改后的密码不能与原密码相同！')
          }
          else{
            modPwd({oldpwd: this.oldpwd, newpwd: this.newpwd})
              .then(res => {
                if(res.data.msg == 'ok') {
                  alert('修改成功')
                  this.$router.push('/profile/main')
                }
                else {
                  alert('密码错误，修改失败')
                }
              })
          }
        }
        else {
          alert('请检查输入')
        }
      },
      // 验证密码
      inputNewpwd() {
        if(!this.newpwd) {
          this.isPasswordAvailable = false
        }
        else if(this.newpwd.length < 6 || this.newpwd.length > 12) {
          this.isPasswordAvailable = false
          this.newpwdTips = '密码长度应为6-12字符'
        }
        else if(/\s/.test(this.newpwd)) {
          this.isPasswordAvailable = false
          this.newpwdTips = '密码不应包含空格'
        }
        else {
          this.isPasswordAvailable = true
          this.newpwdTips = '√'
        }
        this.inputConfirm()
      },
      // 验证再次输入的密码
      inputConfirm() {
        if(!this.confirm) {
          this.isConfirmAvailable = false
        }
        else if(this.newpwd == this.confirm) {
          this.isConfirmAvailable = true
          this.confirmTips = '√'
        }
        else if(this.confirm !== this.newpwd) {
          this.isConfirmAvailable = false
          this.confirmTips = '两次输入密码不一致'
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
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
