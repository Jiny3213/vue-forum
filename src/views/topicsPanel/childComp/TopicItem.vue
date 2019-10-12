<template>
  <ul class="topic">
    <li v-for="(topic, index) in topics" :key="index" @click="clickTopic">
      <!-- 头像 -->
      <div :title="topic.owner">
        <img class="owner-avatar" src="~@assets/img/avater-default.png" alt="">
      </div>
      <!-- 评论数、浏览量 -->
      <div class="number">
        <span class="comments">{{topic.comments}}</span>/{{topic.browsed}}
      </div>
      <!-- tag -->
      <tag-box class="tag" :tagName="topic.tag"></tag-box>
      <!-- <div class="tag">{{topic.tag}}</div> -->
      <!-- 标题 -->
      <div class="title">{{topic.title}}</div>
      <!-- 最后评论时间 -->
      <div class="last-comment-date">{{topic.lastCommentDate}}</div>
      <!-- 最后评论人头像 -->
      <div :title="topic.lastCommenter">
        <img class="last-commenter-avatar" src="~@assets/img/avater-default.png" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
  import {request} from '@network/request.js'
  import TagBox from '@components/common/tagBox/TagBox'
  
  export default {
    name: 'topic-item',
    data() {
      return {
        topics: null
      }
    },
    components: {
      TagBox
    },
    methods: {
      clickTopic() {
        this.$router.push('/topic')
      }
    },
    // 获取topic列表
    created() {
      request({
        url: '/topic'
      }).then(res => {
        this.topics = res.data
      })
    }
    
  }
</script>

<style lang="scss" scoped>
  /* 帖子 */
  .topic li{
    height: 50px;
    padding: 0 12px 0 10px;
    clear: left;
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
    &:hover{
      background: #f6f6f6;
    }
  }
  .owner-avatar{
    height: 36px;
    width: 36px;
    margin-top: 7px;
    border: 1px solid #000000;
    float: left;
  }
  
  .number{
    font-size: 12px;
    margin-left: 5px;
    width: 60px;
    line-height: 50px;
    float: left;
    .comments{
      font-size: 14px;
      color: #9e78c6;
    }
  }
  
  .tag{
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .title{
    margin-left: 5px;
    line-height: 50px;
    float: left;
    &:hover{
      text-decoration: underline;
    }
  }
  
  .last-commenter-avatar{
    float: right;
    height: 20px;
    margin: 15px 25px 0 0;
    border: 1px solid #000;
  }
  .last-comment-date{
    float: right;
    font-size: 12px;
    line-height: 50px;
  }
</style>
