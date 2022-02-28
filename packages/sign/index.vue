<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-12-20 15:27:21
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-12-20 16:09:33
-->
<template>
  <section class="signature">
    <div class="signatureBox">
      <div class="canvasBox">
        <canvas
          ref="canvasF"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
        />
        <img :src="imgUrl" class="imgCanvas">
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Sign',
  data() {
    return {
      stageInfo: '',
      imgUrl: '',
      client: {},
      points: [],
      imageDataList: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      lineWidth: 4,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
      isFirstPop: true
    }
  },
  mounted() {
    this.canvasInit()
  },
  methods: {
    canvasInit() {
      const canvas = this.$refs.canvasF
      this.stageInfo = canvas.getBoundingClientRect()
      console.log(this.stageInfo)
      this.canvasTxt = canvas.getContext('2d')
      canvas.height = document.documentElement.clientHeight
      canvas.width = document.documentElement.clientWidth
      this.canvasTxt.lineCap = 'round' // 线条末端添加圆形线帽，减少线条的生硬感
      this.canvasTxt.lineJoin = 'round'
      // 利用阴影，消除锯齿
      this.canvasTxt.shadowBlur = 1
      this.canvasTxt.shadowColor = '#000'
    },
    // mobile
    touchStart(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        const obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY
        }
        this.startX = obj.x
        this.startY = obj.y
        this.points.push(obj)
      }
    },
    undo() {
      if (this.imageDataList.length === 0 || (this.imageDataList.length === 1 && this.isFirstPop)) {
        this.overwrite()
      } else {
        if (this.isFirstPop) {
          this.imageDataList.pop()
          this.isFirstPop = false
        }
        const imgData = this.imageDataList.pop()
        this.canvasTxt.putImageData(imgData, 0, 0)
      }
    },
    touchMove(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        const obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.lineWidth = this.lineWidth
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    touchEnd(ev) {
      console.log(1)
      this.imageDataList.push(this.canvasTxt.getImageData(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height))
      this.$forceUpdate()
      if (!this.isFirstPop) {
        this.isFirstPop = true
      }
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        const obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        console.log(this.$refs.canvasF.width, this.canvasTxt.height)
      }
    },
    // 重写
    overwrite() {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      this.imageDataList = []
      this.imgUrl = ''
      this.points = []
    },
    // 提交签名
    commit() {
      return this.$refs.canvasF.toDataURL()
    }
  }
}
</script>
<style scoped lang="less">
.signature{
  height: 100%;
  width: 100%;
}
  .signatureBox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  .canvasBox {
    box-sizing: border-box;
     height: 100%;
    flex: 1;
  }
  .bottom-button{
        background: #fff;
        width:100%;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .button-render{
          border-radius: 8px;
          width:160px;
          display: flex;
          justify-content: center;
          align-items: center;
          height:40px;
          box-shadow: 0 8px 12px 1px #DFE5ED;
          border-radius: 10px;
          margin-left:10px;
        }
        .button-render:last-of-type{
          background: #2F79D9;
          color: #fff;
        }
        .button-render:last-of-type{
          margin-right: 10px;
        }
      }
</style>
