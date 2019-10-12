<template>
  <ul class="nav">
    <li v-for="(item, index) in nav">
      <a href="" :class="{active: isActive == index}" @click.prevent="clickNav(index)">
        {{item}}
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'topics-nav',
    data() {
      return {
        nav: [
          '全部',
          '精华',
          '分享',
          '问答',
          '求职',
          '客户端测试'
        ],
        isActive: 0,
      }
    },
    methods: {
      clickNav(index) {
        console.log(index)
        this.isActive = index
      }
    },
  }
</script>

<style scoped>
  /* 导航栏 */
  .nav{
    height: 40px;
  }
  .nav li{
    height: 40px;
    float: left;
    margin: 0 10px 0 10px;
    display: flex;
    align-items: center;
  }
  .nav li a{
    padding: 3px 2px 3px 2px;
    line-height: 1;
    border-radius: 4px;
  }
  .nav li a:not(.active){
    color: #80bd01;
  }
  .nav li a:not(.active):hover{
    color: #000;
  }
  .active{
    background: #80bd01;
    color: #fff;
  }
</style>
