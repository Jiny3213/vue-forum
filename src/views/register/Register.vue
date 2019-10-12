<template>
	<div class="login">
    <div class="header">
      注册
    </div>
    <div class="inner">
      <form class="input-form">
        <div class="input-box">
          <label for="Mail">注册邮箱</label>
          <input type="text" name="Mail">
        </div>
        <div class="input-box">
          <label for="User">用户名</label>
          <input type="text" name="User">
        </div>
        <div class="input-box">
          <label for="Password">设置密码</label>
          <input type="password" name="Password">
        </div>
        <div class="input-box">
          <label for="PasswordConfirm">再次确认密码</label>
          <input type="password" name="PasswordConfirm">
        </div>
        <div class="submit-box">
          <input type="submit" value="注册">
        </div>
      </form>
      
    </div>
	</div>
</template>

<script>
	export default {
    name: 'login',
		data() {
			return {
        msg: '123'
      }
     }
	}
</script>

<style scoped>
  .login{
    /* 最小宽度 */
    min-width: 500px;
  }
  .input-form{
    margin-top: 20px;
  }
  .input-box{
    margin-bottom: 15px;
  }
  .input-box label{
    display: inline-block;
    width: 160px;
    text-align: right;
    margin-right: 20px;
  }
  .input-box input{
    display: inline-block;
  }
  .submit-box{
    margin-left: 180px;
  }
</style>
