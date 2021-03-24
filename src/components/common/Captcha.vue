<template>
  <!-- 此组件仅用于展示和切换验证码图片 -->
  <div
  v-html="captchaSvg"
  @click="getNewCaptcha"
  class="captcha"
  title="点击切换验证码"></div>
</template>

<script>
  export default {
    name: 'captcha',
    data() {
      return {
        captchaSvg: ''
      }
    },
    methods: {
      // 获取验证码
      getNewCaptcha() {
        this.$axios.login.getCaptcha().then(res => {
          this.captchaSvg = res.data
        })
      }
    },
    created() {
      this.getNewCaptcha()
    }
  }
</script>

<style lang="scss" scoped>
  .captcha{
    cursor: pointer;
  }
</style>
