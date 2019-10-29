<template>
	<div class="index-main">
    <basic-panel class="panel" :noPadding="true">
      <template v-slot:header>
        <topics-nav @getTopicByTag="switchPage" ref='nav'/>
      </template>
      
      <template class="inner">
        <topics-list :topics="topics"/>
        <pagination :totalTopics="totalTopics" @switchPage="switchPage" @go="go" ref="page"/>
      </template>
    </basic-panel>
	</div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import TopicsList from '@components/common/TopicsList.vue'
  import TopicsNav from './childComp/TopicsNav.vue'
  import Pagination from '@components/common/Pagination.vue'
  
  import {getTopics} from '@network/getData.js'
  
	export default {
    name: 'topics-panel',
    components:{
      BasicPanel,
      TopicsList,
      TopicsNav,
      Pagination
    },
		data() {
			return {
        topics: null,
        totalTopics: 0,
			}
		},
    methods: {
      // 点击数字或tag
      switchPage(option) {
        if(option == 'tag') {
          this.$refs.page.currentPage = 1
        }
        var page = this.$refs.page.currentPage
        var tag = this.$refs.nav.currentTag
        getTopics(page, tag).then(res => {
          this.topics = res.data.topics
          this.totalTopics = res.data.totalTopics
        })
      },
      // 切换前后的页数
      go(n) {
        getTopics(n, this.$refs.nav.currentTag).then(res => {
          this.topics = res.data.topics
          this.totalTopics = res.data.totalTopics
        })
      },
    },
    // 获取topic列表
    created() {
      getTopics(1, '全部').then(res => {
        this.topics = res.data.topics
        this.totalTopics = res.data.totalTopics
      })
    },
    
	}
</script>

<style scoped>
</style>
