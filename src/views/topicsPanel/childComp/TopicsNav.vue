<template>
  <ul class="nav">
    <li v-for="(item, index) in nav" :key="index">
      <a href="" :class="{active: isActive == index}" @click.prevent="clickNav(index, item)">
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
          // '精华',
          '分享',
          '问答',
          '求职',
          '测试'
        ],
        isActive: 0,
        currentTag: '全部'
      }
    },
    methods: {
      clickNav(index, item) {
        if(this.currentTag === item) return
        // 改变样式
        this.isActive = index
        this.currentTag = item
        // 请求数据
        this.$emit('getTopicByTag', 'tag')
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
    padding: 3px 4px 3px 4px;
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
