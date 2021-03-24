// 客户端
import {request} from './request.js'

// 根据id和tag显示文章列表
function getTopics(page, tag) {
  return request({
    url: '/topics',
    params: {
      page,
      tag
    }
  })
}

// 根据id获取文章
function getTopic(topic_id) {
  return request({
    url: '/topic',
    params: {
      topic_id
    }
  })
}

function searchTopics(str, page=1) {
  return request({
    url: '/search',
    params: {
      str: str,
      page: page
    }
  })
}

function getBanner() {
  return request({
    url: '/banner'
  })
}

export default {getTopics, getTopic, searchTopics, getBanner}
