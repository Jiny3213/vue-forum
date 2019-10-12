<template>
  <div>
    <basic-panel>
      <template #header>
        {{topicReply.length}} 回复
      </template>
      
      <template>
        <div class="reply-item" v-for="reply in topicReply">
          <avatar class="avatar"/>
          <div class="agree">
            <img src="@assets/img/svg/agree-normal.svg" alt="">
            <span>{{reply.agree}}</span>
          </div>
          <a href="" class="replyer">{{reply.replyer}}</a>
          <a href="" class="reply-timer">{{reply.floor}}楼 • {{reply.launchTime}}</a>
          <p class="reply-content">{{reply.content}}</p>
        </div>
      </template>
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import Avatar from '@components/common/avatar/Avatar.vue'
  
  export default {
    name: 'topic-reply',
    components: {
      BasicPanel,
      Avatar
    },
    data() {
      return {
        
      }
    },
    props: {
      topicReply: Array
    }
  }
</script>

<style scoped>
  .reply-item{
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  .reply-item:nth-last-child(1){
    border: none;
  }
  .avatar{
    height: 30px;
    width: 30px;
    float: left;
    margin-right: 10px;
  }
  .replyer{
    color: #666666;
    font-weight: bold;
    margin-right: 5px;
  }
  .reply-timer{
    color: #0088cc;
  }
  .reply-content{
    margin: 5px 0 0 50px;
  }
  .agree{
    float: right;
    height: 20px;
  }
  .agree img{
    width: 20px;
  }
  .agree span{
    vertical-align: top;
  }
</style>
