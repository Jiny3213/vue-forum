<template>
  <div>
    <basic-panel>
      <template #header>
        {{topicComments.length}} 回复
        <!-- <img src="/src/assets/img/avatar-default.png" alt=""> -->
      </template>
      
      <template>
        <div class="reply-item" v-for="(comment, index) in topicComments" :key="index">
          <avatar class="avatar"/>
          <div class="agree">
            <img src="../../../assets/img/svg/agree-normal.svg" alt="">
            <span>{{comment.prefer}}</span>
          </div>
          <a href="" class="replyer">{{comment.commenter}}</a>
          <a href="" class="reply-timer">{{comment.floor}}楼 • {{comment.timestamp}}</a>
          <p class="reply-content">{{comment.content}}</p>
        </div>
      </template>
    </basic-panel>
    
    <!-- 回复模块 -->
    <basic-panel class="add-panel">
      <template #header>
        添加回复
      </template>
      
      <template>
        <wang-editor type="comment" ref="editor"></wang-editor>
        <button class="submit" @click="submit">回复</button>
      </template>
      
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel.vue'
  import Avatar from '@components/common/avatar/Avatar.vue'
  import WangEditor from '@components/common/WangEditor.vue'
  import {request} from '@network/request.js'
  
  export default {
    name: 'topic-comments',
    components: {
      BasicPanel,
      Avatar,
      WangEditor
    },
    data() {
      return {
        
      }
    },
    props: {
      topicComments: Array,
      topicHeader: Object
    },
    methods: {
      // 提交评论
      submit() {
        // 获取基础数据
        var text = this.$refs.editor.editor.txt.text()
        var username = this.$store.state.user.username
        var id = this.topicHeader.id
        var timestamp = new Date().getTime()
        // 评论非空
        if(!text.replace(/&nbsp;| /g, '')) {
          alert('请输入评论内容')
          return
        }
        // 发表评论需要用户登录
        if(!username) {
          alert('请登录后再尝试')
          return
        }
        var comment = {
          commenter: username,
          timestamp,
          content: text,
          id
        }
        request({
          url: '/api/comment',
          method: 'post',
          data: comment
        })
          .then(res => {
            if(res.data.msg == 'ok') {
              alert('提交成功')
              // 重新获取文章数据（如果文章过长，可能存在性能问题，后期改进：只请求回复）
              this.$parent.getTopic()
              // 清空回复栏
              this.$refs.editor.editor.txt.html('')
            }
            else {
              alert('服务器繁忙，请稍后再试')
            }
          })
      }
    }
  }
</script>

<style  lang='scss' scoped>
  .reply-item{
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  .reply-item:nth-last-child(1){
    border: none;
  }
  .avatar{
    height: 30px;
    width: 30px;
    float: left;
    margin-right: 10px;
  }
  .replyer{
    color: #666666;
    font-weight: bold;
    margin-right: 5px;
  }
  .reply-timer{
    color: #0088cc;
  }
  .reply-content{
    margin: 5px 0 0 50px;
  }
  .agree{
    float: right;
    height: 20px;
  }
  .agree img{
    width: 20px;
  }
  .agree span{
    vertical-align: top;
  }
  .add-panel{
    margin-top: 10px;
  }
  .submit{
    @include basic-button;
    margin-top: 10px;
  }
</style>
