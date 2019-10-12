<template>
  <div>
    <img class="avatar" src="~@assets/img/avater-default.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'avatar',
    data() {
      return {
        
      }
    },
    props: {
      size: String
    }
    
  }
</script>

<style scoped>
  .avatar{
    width: 100%;
    border: 1px solid #000;
  }
</style>
