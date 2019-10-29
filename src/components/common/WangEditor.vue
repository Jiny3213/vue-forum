<template>
  <div ref="editor"></div>
</template>

<script>
  import E from 'wangeditor'
  
  export default {
    name: 'wang-editor',
    data() {
      return {
        editor: null,
        editorContent: null
      }
    },
    props: {
      // 可选：comment, topic
      type: {
        type: String,
        default: 'topic'
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      // 移动端宽度不够用
      var isMobile = matchMedia('(max-width: 825px)').matches
      // 设置菜单选项
      // 发布文章用
      if(this.type == 'topic' && !isMobile) {
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'image',  // 插入图片
          'code',  // 插入代码
        ]
      }
      // 评论用
      else if(this.type == 'comment' || isMobile) {
        editor.customConfig.menus = [
          'bold',  // 粗体
          'fontSize',  // 字号
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'code',  // 插入代码
        ]
      }
      
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
      this.editor = editor
    }
  }
</script>

<style>
</style>
