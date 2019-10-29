<template>
  <ul class="topic">
    <li v-for="(topic, index) in topics" :key="index" @click="clickTopic(topic.topic_id)">
      <!-- 头像 -->
      <div :title="topic.author">
        <img class="owner-avatar" :src="avatarSrc(topic.authorAvatar)" alt="">
      </div>
      <!-- 评论数、浏览量 -->
      <div class="number">
        <span class="comments" title="回复数">{{topic.comments.length}}</span>
        /
        <span class="browsed" title="浏览量">{{topic.browsed}}</span>
      </div>
      <!-- tag -->
      <span class="tag-box"><span>{{getTag(topic.tag, topic.status)}}</span></span>
      <!-- 标题 -->
      <div class="title">{{topic.title}}</div>
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
  import {baseURL} from '@network/request.js'
  
  export default {
    name: 'topics-list',
    props: ['topics'],
    computed: {
      // 此处闭包
      avatarSrc() {
        return function(avatar) {
          if(avatar) {
              return baseURL + '/uploads/face/' + avatar
            }
            else return baseURL + '/public/img/default/avatar-default.png'
        }
      },
      getTag() {
        return function(tag, status) {
          if(status == 1) {
            return '置顶'
          }
          else return tag
        }
      }
    },
    methods: {
      clickTopic(topic_id) {
        this.$router.push({
          name: 'topic',
          params: {id: topic_id}
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  /* 帖子 */
  .topic li{
    height: 50px;
    padding: 0 12px 0 10px;
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
    position: relative;
    display: flex;
    &:hover{
      background: #f6f6f6;
    }
  }
  .owner-avatar{
    height: 36px;
    width: 36px;
    margin-top: 7px;
    border: 1px solid #000000;
  }
  
  .number{
    margin-left: 10px;
    height: 50px;
    width: 40px;
    line-height: 50px;
    .comments{
      font-size: 14px;
      color: #9e78c6;
      &:hover{
        text-decoration: underline;
      }
    }
    .browsed{
      font-size: 12px;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  
  .tag-box{
    span{
      @include tag-box;
    }
    // 禁止折行
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  
  .title{
    flex: 1;
    margin-left: 5px;
    line-height: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
