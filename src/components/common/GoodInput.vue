<template>
  <div class="good-input">
    <label :for="labelId">{{label}}</label>
    <div class="right-box">
      <div class="input-box">
        <!-- 此处放入input元素 -->
        <slot></slot>
      </div>
      <!-- 此处选择性放入一个p元素 -->
      <slot name="hint"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'good-input',
    props: {
      label: String,
      // =label-id
      labelId: String
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .good-input{
    margin-bottom: 10px;
    display: flex;
    label{
      width: 100px;
      text-align: right;
      margin-right: 10px;
      margin-left: -50px;
      font-size: 16px;
      padding-top: 3px;
    }
    .right-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      .input-box{
        @include good-input;
      }
      // 提示信息的样式
      p{
        margin-top: 10px;
      }
    }
  }
</style>
