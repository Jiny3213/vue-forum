// 客户端
import {request} from './request.js'

// 根据id和tag显示文章列表
function getTopics(page, tag) {
  return request({
    url: '/api/topics',
    params: {
      page,
      tag
    }
  })
}

// 根据id获取文章
function getTopic(topic_id) {
  return request({
    url: '/api/topic',
    params: {
      topic_id
    }
  })
}

function searchTopics(str, page=1) {
  return request({
    url: '/api/search',
    params: {
      str: str,
      page: page
    }
  })
}

export {getTopics, getTopic, searchTopics}