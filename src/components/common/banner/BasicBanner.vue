<template>
  <div class="basic-banner">
    <!-- 轮播图 -->
    <transition-group tag="ul" class="slide-ul" name="list">
      <li v-for="(img, index) in imgs" :key="index + 1" v-show="flag == index">
        <a href="">
          <img class="img-item" :src="img" alt="ad" >
        </a>
      </li>
    </transition-group>

    <div class="carousel-items">
      <span class="carousel-item"
      v-for="(img, index) in imgs"
      :key="index"
      :class="{active: index == flag}"
      @mouseover="change(index)"
      @mouseleave="run"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basic-banner',
    data() {
      return {
        imgs: null,
        flag: 0,
        interval: null
      }
    },
    methods: {
      // 鼠标放上去，停止轮播
      change(index) {
        this.flag = index
        clearInterval(this.interval)
      },
      run() {
        this.interval = setInterval(function() {
          if(this.flag==2) {
            this.flag = 0
            return
          }
          this.flag++
        }.bind(this), 3000)
      }
    },
    created() {
      // 请求轮播图url
      this.$axios.getData.getBanner().then(res => {
        this.imgs = res.data.map(path => {
          return 'http://localhost:3000' + path
        })
      })
    },
    mounted() {
      // 轮播图定时器
      this.run()
    }
  }
</script>

<style scoped>
  .basic-banner{
    /* 占满父元素 */
    width: 100%;
    height: 125px;
    position: relative;
  }

  /* 图片 */
  .slide-ul{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .slide-ul li{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .slide-ul li img{
    width: 100%;
  }
  /* 指示切换器 */
  .carousel-items {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 10;
    bottom: 5px;
    margin: 0 auto;
    font-size: 0;
  }
  .carousel-item{
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #b2b2b2;
    border-radius: 100%;
    cursor: pointer;
    margin-right: 5px;
  }
  /* 指示器高亮 */
  .active{
    background-color: #ffffff;
  }
  /* 过渡效果 */
  .list-enter {
    transform: translateX(100%)
  }
  .list-enter-to {
    transform: translateX(0);
  }

  .list-leave-active, .list-enter-active {
    transition: all 1s ease;
  }
  .list-leave {
    transform: translateX(0)
  }
  .list-leave-to {
   transform: translateX(-100%)
 }


</style>
