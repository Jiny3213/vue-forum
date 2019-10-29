<template>
  <div class="topic-content">
    <div class="text-area" v-html="topicContent"></div>
  </div>
</template>

<script>
  export default {
    name: 'topic-content',
    props: {
      topicContent: String
    }
  }
</script>

<style lang="scss" scoped>
  @import url("~@assets/css/text.css");
  .topic-content{
    margin-top: 10px;
  }
</style>
