<template>
  <span class="tag-box">{{tagName}}</span>
</template>

<script>
  export default {
    name: 'tag-box',
    props: {
      tagName: String
    }
  }
</script>

<style scoped>
  .tag-box{
    font-size: 14px;
    background: #80bd01;
    color: #fff;
    border-radius: 5px;
    padding: 2px 4px 2px 4px;
  }
</style>
