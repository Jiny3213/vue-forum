import {request} from './request.js'

// 上传文章需要用户登录

function sendTopic({tag, title, content}) {
  var text = this.$refs.editor.editor.txt.text()
  if(!this.$store.state.user.username) {
    alert('请登录后再尝试')
    return
  }
  else if(!tag || !title || !text) {
    alert('请填写完整的信息')
    return
  }
  else if(text.length <10) {
    alert('文章内容必须大于10个字符')
    return
  }
  var timestamp = new Date().getTime()
  var username = this.$store.state.user.username
  // content = JSON.stringify(content)
  request({
    url: '/topic',
    method: 'post',
    data: {
      tag,
      title,
      content,
      username,
      timestamp
    }
  }).then(res => {
    if(res.data.msg == 'ok') {
      alert('提交成功')
      this.$router.replace('/')
    }
    else if(res.data.msg == 'nologin'){
      alert('请登录后再进行操作')
      this.$router.replace('/login')
    }
    else {
      alert('服务器繁忙，请稍后再试')
      this.$router.replace('/')
    }
  })
}


export {sendTopic}