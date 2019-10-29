<template>
  <div class="cropper">
    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :autoCrop="option.autoCrop"
      :centerBox="option.centerBox"
      :fixedNumber="option.fixedNumber"
      :fixed="option.fixed"
      :fixedBox="option.fixedBox"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
    ></vueCropper>
  </div>
</template>

<script>
  import { VueCropper }  from 'vue-cropper'
  
  export default {
    name: 'cropper',
    components: {
      VueCropper
    },
    data() {
      return {
        option: {
          img: '',
          outputType: 'jpeg',
          outputSize: 1,
          autoCrop: true,
          centerBox: true,
          fixedNumber: [1, 1],
          fixed: true,
          fixedBox: true,
          autoCropWidth: 150,
          autoCropHeight: 150,
          outputType: 'jpeg',
        }
      }
    },
    methods: {
      // 供父元素调用的方法：截图并发送预览图
      getCropData() {
        this.$refs.cropper.getCropBlob(blob => {
          // console.log(`截图压缩前:${blob.size/1000}KB`)
          this.$emit('preview', blob)
        })
      },
      // 供父元素调用的方法：获取base64原始图片并展示，供用户截图
      getImg(img) {
        this.option.img = img
      },
    }
  }
</script>

<style lang="scss" scoped>
  .cropper{
    height: 250px;
    width: 250px;
  }
  
</style>
