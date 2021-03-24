<template>
	<div class="index-main">
    <basic-panel class="panel" :noPadding="true">
      <template v-slot:header>
        <!--tag-->
        <topics-nav @getTopicByTag="switchPage" ref='nav'/>
      </template>

      <template class="inner">
        <!--主体-->
        <topics-list :topics="topics"/>
        <!--分页器-->
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
        if(option === 'tag') {
          this.$refs.page.currentPage = 1
        }
        var page = this.$refs.page.currentPage
        var tag = this.$refs.nav.currentTag
        this.$axios.getData.getTopics(page, tag).then(res => {
          this.topics = res.data.topics
          this.totalTopics = res.data.totalTopics
        })
      },
      // 切换前后的页数
      go(n) {
        this.$axios.getData.getTopics(n, this.$refs.nav.currentTag).then(res => {
          this.topics = res.data.topics
          this.totalTopics = res.data.totalTopics
        })
      },
    },
    // 获取topic列表
    created() {
      this.$axios.getData.getTopics(1, '全部').then(res => {
        this.topics = res.data.topics
        this.totalTopics = res.data.totalTopics
      })
    },

	}
</script>

<style scoped>
</style>
