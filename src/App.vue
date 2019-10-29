<template>
  <div id="app">
    <index-header/>
    <main>
      <keep-alive include="topics-panel">
        <router-view class='main-left'></router-view>
      </keep-alive>
      <index-aside class="main-right"/>
    </main>
    <index-footer/>
  </div>
</template>

<script>
  // 引入首页三个主要组件，其中主组件使用路由
  import IndexHeader from '@views/indexHeader/IndexHeader.vue'
  import IndexAside from '@views/indexAside/IndexAside.vue'
  import IndexFooter from '@views/indexFooter/IndexFooter.vue'
  
  // 每次刷新页面，都向服务器请求登录
  import {getUser} from '@network/login.js'
  
  export default {
    name: 'app',
    components: {
      IndexHeader,
      IndexAside,
      IndexFooter
    },
    mounted() {
      // 获取登录信息
      getUser.call(this)
    }
  }
</script>

<style lang="scss">
  /* 此处一定要加上~，在dom中使用也要加~ */
	@import url("~@assets/css/normalize.css");
  
  // pc端
  @media (min-width: $action-width) {
    main{
      width: 90%;
      max-width: 1400px;
      margin: 15px auto;
      display: flex;
    }
    .main-left{
      flex: 1;
      margin-right: 15px;
    }
  }
  
  // 移动端
  @media (max-width: $action-width) {
    main {
      width: 95%;
      margin: 10px auto;
    }
  }
  
</style>
