<template>
	<div class="index-main">
    <basic-panel class="panel" :noPadding="true">
      <template v-slot:header>
        <topics-nav/>
      </template>
      
      <template class="inner">
        <topic-item/>
      </template>
    </basic-panel>
	</div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import TopicItem from './childComp/TopicItem.vue'
  import TopicsNav from './childComp/TopicsNav.vue'
  
	export default {
    name: 'topics-panel',
    components:{
      BasicPanel,
      TopicItem,
      TopicsNav
    },
		data() {
			return {
			}
		},
	}
</script>

<style scoped>
  .panel{
    min-width: 500px;
  }
  .inner{
    padding: none;
  }
</style>
