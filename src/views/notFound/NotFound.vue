<template>
  <basic-panel>
    <template #header>
      页面不存在
    </template>
    <template>
      <div class="err">
        <img src="~@assets/img/404.png" alt="">
        <p @click="$router.replace('/')">点击返回首页</p>
      </div>
    </template>
  </basic-panel>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  
  export default {
    name: 'not-found',
    data() {
      return {
        
      }
    },
    components: {BasicPanel}
  }
</script>

<style lang="scss" scoped>
  .err{
    img{
      display: block;
      margin: 0 auto;
    }
    p{
      text-align: center;
      font-size: 30px;
      color: #C24F4A;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  
</style>
