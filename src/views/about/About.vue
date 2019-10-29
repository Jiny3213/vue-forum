<template>
  <div>
    <basic-panel>
      <template #header>
        开发日志
      </template>
      
      <template>
        <p>本站由Jiny独立开发，前端技术：基于vuejs的SPA，后端技术：node + express， mongodb数据库</p>
        <br>
        <p>服务器和数据库在阿里云，由于没有时间注册备案域名，目前仅能通过ip访问</p>
        <br>
        <h2>更新内容：（10.28）</h2>
        <ul>
          <li>使用mongodb数据库，保存用户信息和文章</li>
          <li>响应式布局</li>
          <li>增加头像修改功能，能够在文章列表和评论中显示</li>
          <li>增加用户档案页，支持修改密码</li>
          <li>话题列表分页展示，根据tag筛选展示</li>
        </ul>
        <br>
        <h2>更新内容：（10.17）</h2>
        <ul>
          <li>完成文章发布，回复功能，重构部分代码</li>
          <li>使用json储存用户信息和文章</li>
        </ul>
        <br>
        <h2>Todo:</h2>
        <ul>
          <li>1. 上Mongo数据库,目前还在使用json存储网站数据</li>
          <li>2. 首页自动换页功能，分tag功能，用户积分功能</li>
          <li>3. 用户回复用户的提醒功能，回复的回复的嵌套模块</li>
          <li>4. ......</li>
        </ul>
        <br>
        <h3>欢迎给本站提建议，直接发布话题或联系邮箱：149757089@qq.com</h3>
      </template>
    </basic-panel>
  </div>
</template>

<script>
  import BasicPanel from '@components/common/panel/BasicPanel'
  
  export default{
    name: 'about',
    components: {
      BasicPanel
    }
  }
</script>

<style>
</style>
