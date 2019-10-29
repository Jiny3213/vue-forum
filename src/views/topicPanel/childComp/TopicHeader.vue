<template>
  <div class="topic-header">
    <span class="tag-box">{{topicHeader.tag}}</span>
    <span class="title">{{topicHeader.title}}</span>
    <div class="header-detail">
      <span class="separate">发布于{{getDate(topicHeader.create_time)}} </span>
      <span class="separate">作者{{topicHeader.author}} </span>
      <span class="separate">{{topicHeader.browsed}}次浏览 </span>
      <span class="separate">来自 {{topicHeader.tag}} </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topic-header',
    components: {
    },
    data() {
      return {
      }
    },
    props: {
      // 需要传入一个文章数据的对象
      topicHeader: Object
    },
    methods: {
      getDate(create_time) {
        var createDate = new Date(create_time)
        var year = createDate.getFullYear()
        var month = createDate.getMonth()
        var date = createDate.getDate()
        return `${year}年${month}月${date}日`
      }
    }
  }
</script>

<style lang='scss' scoped>
  .topic-header{
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
  }
  .header-detail{
    font-size: 12px;
    color: #838383;
    margin-top: 10px;
  }
  .separate::before{
    content: '• ';
  }
  .tag-box{
    @include tag-box
  }
</style>
