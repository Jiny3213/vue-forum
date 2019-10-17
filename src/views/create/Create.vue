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
      <wang-editor ref="editor"></wang-editor>
      
      <!-- 提交 -->
      <button class="submit" @click="submit">提交</button>
      <!-- <button class="submit" @click="test">测试</button> -->
      <!-- <div class="text-area" v-html="content"></div> -->
    </template>
  </basic-panel>
  
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  import WangEditor from '@components/common/WangEditor.vue'
  import {sendTopic} from '@network/sendTopic.js'
  
  export default{
    name: 'create',
    data() {
      return {
        tag: null,
        title: null,
        content: null,
        // 发送tag前转换成中文
        tagName: {
          share: '分享',
          ask: '问答',
          job: '求职',
          test: '测试'
        }
      }
    },
    components: {
      BasicPanel,
      WangEditor
    },
    methods: {
      submit() {
        var data = {
          tag: this.tagName[this.tag], 
          title: this.title, 
          content: this.$refs.editor.editorContent
        } 
        sendTopic.call(this, data)
      },
      // test() {
      //   this.$refs.editor.test()
      //   this.content = this.$refs.editor.editorContent
      // }
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
  // @import url("~@assets/css/text.css");
</style>
