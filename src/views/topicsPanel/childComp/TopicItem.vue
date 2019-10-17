<template>
  <ul class="topic">
    <li v-for="(topic, index) in topics" :key="index" @click="clickTopic(topic.header.id)">
      <!-- 头像 -->
      <div :title="topic.header.author">
        <img class="owner-avatar" src="~@assets/img/avatar-default.png" alt="">
      </div>
      <!-- 评论数、浏览量 -->
      <div class="number">
        <span class="comments">{{topic.comments.length}}</span>/{{topic.header.browsed}}
      </div>
      <!-- tag -->
      <span class="tag-box">{{topic.header.tag}}</span>
      <!-- 标题 -->
      <div class="title">{{topic.header.title}}</div>
      <!-- 最后评论时间 -->
      <!-- <div class="last-comment-date" v-if="topic.comments[0]">{{topic.header.author}}</div> -->
      <!-- 最后评论人头像 -->
      <!-- <div :title="topic.comments[comments.length-1].commenter">
        <img class="last-commenter-avatar" src="~@assets/img/avatar-default.png" alt=""
        v-if="topic.comments[0]">
      </div> -->
    </li>
  </ul>
</template>

<script>
  import {request} from '@network/request.js'
  
  export default {
    name: 'topic-item',
    data() {
      return {
        topics: null
      }
    },
    components: {
    },
    methods: {
      clickTopic(id) {
        this.$router.push({
          name: 'topic',
          params: {id}
        })
      }
    },
    // 获取topic列表
    created() {
      request({
        url: '/api/topics'
      }).then(res => {
        console.log(res.data)
        
        this.topics = res.data.topics
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
    position: relative;
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
  
  .tag-box{
    @include tag-box;
    float: left;
    position: relative;
    top: 25px;
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
