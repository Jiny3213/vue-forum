<template>
  <ul>
    <div @click="go(-1)"  class="go-left">
      <span>上一页</span>
      <img src="~@assets/img/svg/go-left.svg" alt="">
    </div>
    <li v-if="currentPage > 3">...</li>
    <li v-for="n in pages" :key="n" @click="switchPage(n)"
    :class="{active: currentPage == n}">{{n}}</li>
    <li v-if="isMaxout && currentPage < totalPage-2">...</li>
    <div @click="go(1)" class="go-right">
      <span>下一页</span>
      <img src="~@assets/img/svg/go-right.svg" alt="">
    </div>
  </ul>
</template>

<script>
  export default {
    name: 'pagination',
    data() {
      return {
        currentPage: 1,
      }
    },
    computed: {
      // 返回一个数组
      pages() {
        // 拿到数据才能计算
        if(this.totalTopics) {
          var page
          // 没到4的情况
          if(this.isMaxout && this.currentPage < 4) {
            return 5
          }
          else if(this.isMaxout && this.currentPage >=4 && this.currentPage <= this.totalPage-2) {
            page = this.currentPage
            return [page-2, page-1, page, page+1, page+2]
          }
          else if(this.isMaxout && this.currentPage == this.totalPage-1) {
            page = this.currentPage
            return [page-2, page-1, page, page+1]
          }
          else if(this.isMaxout && this.currentPage == this.totalPage) {
            page = this.currentPage
            return [page-2, page-1, page]
          }
          else {
            return this.totalPage
          }
        }
        // 还没拿到数据,返回假数据
        else return 5
      },
      totalPage() {
        return Math.ceil(this.totalTopics / this.pageSize)
      },
      // 实际页数超出显示页数，显示...
      isMaxout() {
        return this.totalPage > this.maxPages
      }
    },
    props: {
      // 总共有多少项数据
      totalTopics: Number,
      // 每页显示多少数据
      pageSize: {
        type: Number,
        default: 10
      },
      // 显示多少页开始出现...
      maxPages: {
        type: Number,
        default: 5
      }
    },
    methods: {
      // 切换页数
      switchPage(n) {
        if(n != this.currentPage) {
          this.currentPage = n
          this.$emit('switchPage', 'page')
        }
      },
      go(n) {
        // 前进
        if(n == 1 && this.currentPage < this.totalPage) {
          this.$emit('go', ++this.currentPage)
        }
        // 后退
        else if(n == -1 && this.currentPage > 1) {
          this.$emit('go', --this.currentPage)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  ul{
    margin-top: 10px;
    margin-left: 20px;
    display: inline-block;
    
    .go-left{
      float: left;
      cursor: pointer;
      margin-right: 5px;
      img{
        float: right;
        display: block;
        height: 20px;
        width: 20px;
        transition: transform 1s;
      }
      span{
        float: right;
        &:hover{
          +img{
            transform: rotateX(180deg);
          }
        }
      }
    }
    .go-right{
      float: left;
      cursor: pointer;
      margin-left: 5px;
      img{
        float: left;
        display: block;
        height: 20px;
        width: 20px;
        transition: transform 1s;
      }
      span{
        float: left;
        &:hover{
          +img{
            transform: rotateX(180deg);
          }
        }
      }
    }
    li{
      float: left;
      font-size: 16px;
      line-height: 20px;
      padding: 0 5px;
      text-align: center;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
    &::after{
      content: '';
      clear: left;
      display: block;
      background: none;
    }
  }
  .active {
    color: #C24F4A;
  }
</style>
