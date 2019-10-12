<template>
  <basic-panel :isHeader="false" class="panel">
    <template>
      <div class="main-title">
        发布话题
      </div>
      <div class="input-form">
        <form action="">
          <!-- 选择话题标签 -->
          <div class="tag">
            <span>选择板块：</span>
            <select name="tag" v-model="tag">
              <option class="option" value="share">分享</option>
              <option class="option" value="ask">问答</option>
              <option class="option" value="job">求职</option>
              <option class="option" value="test">测试</option>
            </select>
          </div>
          <!-- 输入标题 -->
          <div class="title">
            <input type="text" placeholder="标题" v-model="title">
          </div>
        </form>
      </div>
      
      <!-- 富文本编辑器 -->
      <div ref="editor"></div>
      
      <!-- 提交 -->
      <button class="submit" @click="submit">提交</button>
      
    </template>
  </basic-panel>
  
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import E from 'wangeditor'
  
  export default{
    name: 'create',
    data() {
      return {
        editorContent: '',
        editor: null,
        tag: null,
        title: null
      }
    },
    components: {
      BasicPanel,
    },
    methods: {
      getJson() {
        var json = this.editor.txt.getJSON()
        var jsonStr = JSON.stringify(json)
        console.log(JSON.parse(JSON.stringify(this.editorContent)))
        console.log(this.editor.txt.getJSON())
      },
      submit() {
        alert('提交成功')
        this.$router.replace('/')
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      // 设置菜单选项
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
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
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
      this.editor = editor
    }
  }
</script>

<style lang="scss" scoped>
  .main-title{
    @include main-title
  }
  .input-form{
    margin: 10px 0;
  }
  .tag {
    span {
      font-size: 16px;
    }
    select {
      display: inline-block;
      width: 100px;
      height: 30px;
      border: 1px solid $bgGrey;
      border-radius: 5px;
      outline: none;
      text-align: center;
      transition: box-shadow 0.25s ease;
      &:hover{
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      }
    }
  }
  .title {
    margin-top: 10px;
    width: 80%;
    height: 30px;
    border: 1px solid $bgGrey;
    border-radius: 5px;
    padding-left: 8px;
    transition: box-shadow 0.25s ease;
    &:hover{
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    }
    input{
      border: none;
      outline: none;
      line-height: 30px;
      width: 100%;
      background: none;
    }
  }
  .submit{
    @include basic-button;
    margin: 10px auto 0 auto;
  }
</style>
