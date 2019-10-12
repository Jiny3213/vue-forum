<template>
  <div class="topic-header">
    <tag-box :tagName="topicHeader.tagName"/>
    <span class="title">{{topicHeader.title}}</span>
    <div class="header-detail">
      <span class="separate">发布于{{topicHeader.launchTime}}</span>
      <span class="separate">作者{{topicHeader.author}}</span>
      <span class="separate">{{topicHeader.viewed}}次浏览</span>
      <span class="separate">来自 {{topicHeader.tag}}</span>
    </div>
  </div>
</template>

<script>
  import TagBox from '@components/common/tagBox/TagBox.vue'
  
  export default {
    name: 'topic-header',
    components: {
      TagBox
    },
    data() {
      return {
      }
    },
    props: {
      // 需要传入一个文章数据的对象
      topicHeader: Object
    }
  }
</script>

<style scoped>
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
</style>
