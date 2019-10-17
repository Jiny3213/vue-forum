<template>
  <div>
    <basic-panel>
      <template #header>
        关于本站
      </template>
      
      <template>
        <p>本站由Jiny独立开发，模仿CNode社区的一个小项目</p>
        <br>
        <h2>更新内容：（10.17）</h2>
        <ul>
          <li>完成文章发布，回复功能，重构部分代码</li>
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
