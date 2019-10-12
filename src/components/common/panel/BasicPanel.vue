<template>
  <!-- 使用时需要为组件绑定class并定义width！ -->
  <div>
    <!-- 这是一个可选插槽，默认显示，传入isHeader控制不显示 -->
    <div class="header" :style="{display: isHeader ? 'block' : 'none'}">
      <slot name="header"></slot>
    </div>
    <div class="inner" 
    :class="{hasheader: !isHeader}"
    :style="{padding: noPadding ? 'none' : '10px'}">
      <!-- 这是一个默认插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basic-panel',
    data() {
      return {
        
      }
    },
    props: {
      isHeader: {
        type: Boolean,
        default: true
      },
      // inner是否应该有padding，默认有10px
      noPadding: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 头部 */
  .header{
    /* 固定高度+左缩进+背景颜色+上圆角 */
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #f6f6f6;
    border-radius: 5px 5px 0 0;
  }
  /* 内容 */
  .inner{
    min-height: 50px;
    background: #fff;
    border-radius: 0 0 5px 5px;
  }
  /* 没有头部的时候，也有圆角 */
  .hasheader{
    border-radius: 5px 5px 5px 5px;
  }
</style>
