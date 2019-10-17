<template>
  <div class="topic">
    <basic-panel :isHeader="false">
      <topic-header :topicHeader="topicHeader"/>
      <topic-content :topicContent="topicContent"/>
    </basic-panel>
    
    <topic-comments class="reply" :topicComments="topicComments" :topicHeader="topicHeader"/>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import TopicHeader from './childComp/TopicHeader'
  import TopicContent from './childComp/TopicContent'
  import TopicComments from './childComp/TopicComments'
  import {getTopic} from '@network/getTopic'
  
  export default {
    name: 'topic-panel',
    data() {
      return {
        id: null,
        topicContent: '',
        topicHeader: {},
        topicComments: []
      }
    },
    components: {
      BasicPanel,
      TopicHeader,
      TopicContent,
      TopicComments
    },
    created() {
      // 向服务器请求文章相关数据,回复后需要再次调用
      this.id = this.$route.params.id
      this.getTopic()
    },
    methods: {
      getTopic() {
        getTopic.call(this, this.id)
      }
    }
  }
</script>

<style scoped>
  .reply{
    margin-top: 10px;
  }
</style>
