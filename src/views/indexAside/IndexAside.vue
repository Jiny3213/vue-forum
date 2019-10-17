<template>
  <div class="index-aside">
    <basic-panel class="panel">
      <template v-slot:header>个人信息</template>
      <template>
        <span v-if="!isLogin">请登录</span>
        <div v-else>
          <img class="user-avatar" src="~@assets/img/avatar-default.png" alt="默认头像">
          <div class="user-name"><span>{{this.$store.state.user.username}}</span></div>
        </div>
      </template>
    </basic-panel>
    
    <basic-panel class="panel create" :isHeader="false">
      <template>
        <button class="create-button" @click="create">发布话题</button>
      </template>
    </basic-panel>
    
    <basic-panel class="panel">
      <template v-slot:header>轮播图</template>
      <template>
        <basic-banner></basic-banner>
      </template>
    </basic-panel>
    
    <basic-panel class="panel">
      <template v-slot:header>积分榜</template>
      <template>积分榜</template>
    </basic-panel>
    
    <basic-panel class="panel">
      <template v-slot:header>Node.js 开源技术社区</template>
      <template>
        <a href="https://cnodejs.org/" target="_blank">
          <div class="logo">
            <img src="~@assets/img/svg/cnodejs.svg" alt="Node.js社区">
          </div>
        </a>
      </template>
    </basic-panel>
    
    <basic-panel class="panel">
      <template v-slot:header>关注我</template>
      <template>
        github: <a class="my-github" href="https://github.com/Jiny3213" target="_blank">https://github.com/Jiny3213</a>
      </template>
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import BasicBanner from '@components/common/banner/BasicBanner.vue'
  
  export default{
    name: 'index-aside',
    data() {
      return {
      }
    },
    components: {
      BasicPanel,
      BasicBanner
    },
    methods: {
      router(path) {
        if(this.$route.path == path) return
        this.$router.replace(path)
      },
      create() {
        if(this.$store.state.user.username) {
          this.router('/create')
        }
        else {
          alert('请先登录')
          if(this.$route.path != '/login')
          this.$router.push('/login')
        }
      },
    },
    computed: {
      isLogin() {
        if(this.$store.state.user.username) return true
        else return false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .panel{
    width: 290px;
    margin-bottom: 12px;
  }
  .user-avatar{
    width: 48px;
    border: 1px solid $bgGrey;
    margin-right: 10px;
  }
  .user-name{
    height: 50px;
    width: 200px;
    display: inline-block;
    position: relative;
    span{
      font-size: 16px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .create{
    position: relative;
  }
  .create-button{
    @include basic-button;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .logo{
    background-color: #444444;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
  }
  .my-github{
    color: #00f;
    &:hover{
      text-decoration: underline;
    }
  }
</style>
