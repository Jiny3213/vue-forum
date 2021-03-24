<template>
  <div class="profile-avatar">
    <div class="left-box">
      <div class="upload-box" v-show="isUploadShow">
        <input type="file" accept="image/*" ref='file' @change="readFile">
        <img src="~@assets/img/upload.png" alt="">
      </div>
      <cropper
      class="cropper"
      ref='cropper'
      @preview="preview"/>
      <span class="get-file" @click="getFile" v-show="!isUploadShow">重新选择</span>
      <button @click="crop" v-if="isCropButtonShow">截图</button>
    </div>
    <div class="right-box" v-if="isPreviewShow">
      <p>头像预览</p>
      <div class="preview">
        <img ref='preview'>
      </div>
      <button @click="upload">上传</button>
    </div>
  </div>
</template>

<script>
  import Cropper from './childComp/Cropper.vue'
  import {uploadAvatar} from '../../network/sendData.js'

  export default {
    name: 'profile-avatar',
    data() {
      return {
        croppedBlob: null,
        isPreviewShow: false,
        isCropButtonShow: false,
        isUploadShow: true
      }
    },
    components: {Cropper},
    methods: {
      // 第一步用户选择图片：读取图片，放进cropper
      readFile() {
        this.isUploadShow = false
        var file = this.$refs.file.files[0]
        if(!file) {
          return
        }
        this.isCropButtonShow = true
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
          // 获取到base64编码的图片，传入cropper
          this.$refs.cropper.getImg(reader.result)
        }.bind(this)
      },
      // 再次选择图片
      getFile() {
        this.$refs.file.dispatchEvent(new MouseEvent('click'))
      },
      // 调用cropper组件方法截图
      crop() {
        this.$refs.cropper.getCropData()
        this.isPreviewShow = true
      },
      // 预览截图
      preview(blob) {
        this.croppedBlob = blob
        this.$refs.preview.src = URL.createObjectURL(blob)
      },
      // 压缩图片
      compass() {
        var img = this.$refs.preview
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        return new Promise(resolve => {
          canvas.toBlob(blob => {
            // 预计原始截图40kb，压缩后8kb
            // console.log(`截图压缩后:${blob.size/1000}KB`)
            console.log(blob)
            resolve(blob)
          }, "image/jpeg", 0.95)
          let base64 = canvas.toDataURL('image/jpeg', 0.95) // jpeg才能压缩
          console.log(base64)
        })
      },
      // 上传头像
      upload() {
        if(!this.$refs.preview.src) {
          alert('请截图再上传~')
          return
        }
        this.compass().then(blob => {
          return
          console.log(typeof uploadAvatar)
          var file = new File([blob], 'avatar.jpg', {type: 'image/jpeg'})
          var formData = new FormData()
          // 此处的键需要与后台upload.single('avatar')一致
          formData.append('avatar', file)
          uploadAvatar(formData)
            .then(res => {
              if(res.data.msg == 'ok') {
                alert('头像上传成功！')
                // 储存token到本地
                localStorage.setItem('token', "Bearer " + res.data.token)
                // 提交用户数据到vuex
                this.$store.commit('setUser', res.data.user)
                this.$router.push('/')
              }
            })
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-avatar{
    display: flex;
    &::after {
      content: '';
      display: block;
      clear: left;
    }
  }
  button{
    @include basic-button;
  }
  .left-box, .right-box{
    height: 350px;
  }
  .left-box{
    flex: 1;
    min-width: 250px;
    position: relative;
    .upload-box{
      height: 250px;
      width: 250px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      // 盖住cropper
      z-index: 2;
      input{
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        // 盖住img
        z-index: 3;
      }
      img{
        width: 250px;
        background-color: #e1e1e1;
        position: absolute;
      }
    }
    .cropper{
      margin: 10px auto;
    }
    // 重新选择
    .get-file{
      display: block;
      width: 100px;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 10px;
      cursor: pointer;
      &::before{
        content: '';
        display: inline-block;
        height: 20px;
        width: 20px;
        background: url('~@assets/img/svg/cycle.svg');
        background-size: 20px;
        position: relative;
        top: 4px;
        margin-right: 3px;
        transition: transform 1s;
      }
      &:hover{
        &::before{
          transform: rotate(180deg);
        }
      }
    }
    button{
      display: block;
      margin: 0 auto;
    }
  }
  .right-box{
    flex: 1;
    min-width: 100px;
    p{
      text-align: center;
      margin: 50px 0 10px 0;
      font-size: 16px;
    }
    /* 预览图大小 */
    .preview {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    button{
      display: block;
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  // 移动端
  @media (max-width: $action-width) {
    .profile-avatar{
      flex-direction: column;
    }
    .right-box{
      p{
        margin-top: 10px;
      }
    }
  }
</style>
