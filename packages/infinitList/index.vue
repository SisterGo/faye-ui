<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-12-22 15:44:39
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-12-22 17:01:50
-->
<template>
  <div>
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent">
      <div
        :style="{ height: listHeight + 'px' }"
        class="infinite-list-phantom"
      />
      <div :style="{transform:getTransform}">
        <div v-for="(item,index) in visibleData" :style="{height:itemHeight+'px',lineHeight:itemHeight+'px'}" :key="index" class="line-item">
          <slot :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfinitList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 48
    }
  },
  data: () => ({
    // 可视区域高度
    screenHeight: document.documentElement.clientHeight || document.body.clientHeight,
    startOffset: 0, // 偏移量
    start: 0 // 起始索引
  }),
  computed: {
    // 可视区域列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemHeight)
    },
    // 结束索引
    end() {
      return this.start + this.visibleCount
    },
    // /列表总高度
    listHeight() {
      return this.itemHeight * this.list.length
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`
    },
    // 获取真实列表显示数据
    visibleData() {
      return this.list.slice(this.start, Math.min(this.end, this.list.length))
    }
  },
  methods: {
    scrollEvent() {
      // 当前滚动位置
      const scrollTop = this.$refs.list.scrollTop
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.itemHeight)
      // 此时的结束索引
      this.end = this.start + this.visibleCount
      this.startOffset = scrollTop - (scrollTop % this.itemHeight)
    }
  }
}
</script>
<style lang="less" scoped>
.line-item{
  display: flex;
  justify-content: center;
  align-items: center;
  // border-bottom: 1px solid #eee;
}
.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}
.infinite-list-container {
    margin-top: 10px;
    height: 99%;
    overflow: scroll;
    position: relative;
    -webkit-overflow-scrolling: touch;
}
</style>
