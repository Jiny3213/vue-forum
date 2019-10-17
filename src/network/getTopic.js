import {request} from './request.js'

function getTopic(id) {
  request({
    url: '/api/topic',
    params: {
      id
    }
  }).then(res => {
    if(res.data.msg == 'ok') {
      var topic = res.data.topic
      this.topicContent = topic.content
      // 定义头部信息
      this.topicHeader = topic.header
      // 定义评论信息
      this.topicComments = topic.comments
    }
    else {
      alert('网络繁忙，请稍后再试')
    }
  }).catch(err => {
    console.log(err)
    console.log('网络错误')
  })
   
}

export {getTopic} 