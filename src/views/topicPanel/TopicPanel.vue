<template>
  <div class="topic">
    <basic-panel :isHeader="false">
      <topic-header :topicHeader="topicData.header"/>
      <topic-content :topicContent="topicData.content"/>
    </basic-panel>
    
    <topic-reply class="reply" :topicReply="topicData.reply"/>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import TopicHeader from './childComp/TopicHeader'
  import TopicContent from './childComp/TopicContent'
  import TopicReply from './childComp/TopicReply'
  
  export default {
    name: 'topic-panel',
    data() {
      return {
        topicData: {
          header: {
            // 文章标题及相关信息
            tagName: '置顶',
            title: '你值得关注的64位系统',
            launchTime: '5个月前',
            author: 'Jiny',
            viewed: 23333,
            tag: '分享'
          },
          content: `Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
                      如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。
                      如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。`,
          reply: [
            {
              replyer: '张三',
              floor: 1,
              launchTime: '5个月前',
              content: '好好好好好好好好好好好好好好好',
              agree: 16,
              isAuthor: false
            },
            {
              replyer: '张三',
              floor: 1,
              launchTime: '5个月前',
              content: '好好好好好好好好好好好好好好好',
              agree: 16,
              isAuthor: false
            },
            {
              replyer: '张三',
              floor: 1,
              launchTime: '5个月前',
              content: '好好好好好好好好好好好好好好好',
              agree: 16,
              isAuthor: false
            }
          ]
        }
      }
    },
    components: {
      BasicPanel,
      TopicHeader,
      TopicContent,
      TopicReply
    },
    created() {
      // 向服务器请求文章相关数据
    }
  }
</script>

<style scoped>
  .reply{
    margin-top: 10px;
  }
</style>
