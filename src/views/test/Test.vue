<template>
  <div>
    <basic-panel :isHeader="false">
      <template>
        测试页面(未开发)
      </template>
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  
  export default {
    name: 'test',
    data() {
      return {
        
      }
    },
    components: {
      BasicPanel
    }
  }
</script>

<style scoped>
  
</style>
