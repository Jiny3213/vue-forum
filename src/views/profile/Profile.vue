<template>
  <div>
    <basic-panel>
      <template #header>
        <span class="title" @click="$router.push('/profile/main')">我的资料</span>
        <ul class="nav">
          <li @click="$router.push('/profile/avatar')">修改头像</li>
          <li class="exclude-li">/</li>
          <li @click="$router.push('/profile/mod')">修改密码</li>
        </ul>
      </template>
      <template>
        <router-view></router-view>
      </template>
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  
  export default {
    name: 'profile',
    components: {BasicPanel},
    data() {
      return {
        
      }
    },
    
  }
</script>

<style lang='scss' scoped>
  .title{
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
    &::after{
      content: '';
      display: inline-block;
      height: 20px;
      width: 20px;
      position: relative;
      top: 4px;
      background: url('~@assets/img/svg/go-right.svg') no-repeat;
      background-size: 20px;
      margin-right: 5px;
    }
  }
  .nav{
    display: inline-block;
    li{
      display: inline-block;
      margin-right: 10px;
      cursor: default;
      &:not(.exclude-li){
        color: #1E88E5;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
