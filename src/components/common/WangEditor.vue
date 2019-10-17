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
      // topic 默认值
      // comment
      type: {
        type: String,
        default: 'topic'
      }
    },
    methods: {
      test() {
        var json = this.editor.txt.getJSON()
        var jsonStr = JSON.stringify(json)
        console.log(JSON.parse(JSON.stringify(this.editorContent)))
        console.log(this.editor.txt.getJSON())
        console.log(typeof(this.editorContent))
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      // 设置菜单选项
      if(this.type == 'topic') {
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
      else if(this.type == 'comment') {
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
