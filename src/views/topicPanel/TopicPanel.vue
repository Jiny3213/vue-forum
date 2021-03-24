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

  export default {
    name: 'topic-panel',
    data() {
      return {
        topic_id: null,
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
      this.topic_id = this.$route.params.id
      this.getTopic()
    },
    methods: {
      getTopic() {
        this.$axios.getData.getTopic(this.topic_id)
        .then(res => {
          if(res.data.msg == 'ok') {
            var topic = res.data.topic
            this.topicContent = topic.content
            // 定义头部信息
            var {
              topic_id,
              author,
              tag,
              title,
              prefer,
              browsed,
              create_time,
              last_modify_time,
              status
            } = topic
            this.topicHeader = {
              topic_id,
              author,
              tag,
              title,
              prefer,
              browsed,
              create_time,
              last_modify_time,
              status
            }
            // 定义评论信息
            this.topicComments = topic.comments
          }
          else {
            alert('网络繁忙，请稍后再试')
            this.$router.replace('/')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .reply{
    margin-top: 10px;
  }
</style>
