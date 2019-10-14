<template>
  <div id="app">
  <index-header/>
  <main>
    <index-aside/>
    <router-view class='main-left'></router-view>
  </main>
  <index-footer/>
  </div>
</template>

<script>
  // 引入首页三个主要组件，其中主组件使用路由
  import IndexHeader from '@views/indexHeader/IndexHeader.vue'
  import IndexAside from '@views/indexAside/IndexAside.vue'
  import IndexFooter from '@views/indexFooter/IndexFooter.vue'
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

<style>
  /* 此处一定要加上~，在dom中使用也要加~ */
	@import url("~@assets/css/normalize.css");
  
  /* 页面整体宽度小于925，布局就会崩坏 */
  #app{
    min-width: 925px;
  }
  
  main{
    width: 90%;
    max-width: 1400px;
    /* min-width: 960px; */
    margin: 15px auto;
  }
  .main-left{
    margin-right: 305px;
  }
  .index-aside{
    float: right;
  }
</style>
