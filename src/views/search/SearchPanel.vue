<template>
  <basic-panel>
    <template #header>
      搜索结果
    </template>
    
    <template>
      <topics-list :topics="topics"/>
      <pagination :totalTopics="totalTopics"/>
    </template>
  </basic-panel>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import TopicsList from '@components/common/TopicsList'
  import Pagination from '@components/common/Pagination'
  import {searchTopics} from '@network/getData'
  
  export default {
    name: 'search-panel',
    components: {BasicPanel, TopicsList, Pagination},
    data() {
      return {
        topics: null,
        searchStr: null,
        totalTopics: null
      }
    },
    methods: {
      getTopics(str) {
        searchTopics(str)
          .then(res => {
            if(res.data.msg == 'ok') {
              this.topics = res.data.topics
              this.totalTopics = res.data.totalTopics
            }
            else {
              // console.log('找不到文章')
            }
          })
      }
    },
    created() {
      this.searchStr = this.$route.params.query
      this.getTopics(this.searchStr)
    },
    beforeRouteUpdate(to, from, next) {
      this.getTopics(to.params.query)
      next()
    }
  }
</script>

<style scoped>
  
</style>
