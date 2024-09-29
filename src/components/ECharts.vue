<template>
  <div ref="chartElem" class="e-charts" :style="{height: `${height}px`}"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    height: Number,
    options: Object
  },
  data () {
    return {
    }
  },
  methods: {
    loadChart  () {
      if (!this.chartInstance) {
        const elem = this.$refs.chartElem
        if (elem) {
          this.chartInstance = echarts.init(elem)
        }
      }
      if (this.chartInstance) {
        this.chartInstance.setOption(Object.assign({}, this.options))
      }
    },
    winResizeEvent () {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }
  },
  watch: {
    options () {
      this.loadChart()
    }
  },
  mounted () {
    this.loadChart()
    window.addEventListener('resize', this.winResizeEvent)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.winResizeEvent)
  }
}
</script>

<style lang="scss" scoped>
.e-charts {
  width: 100%;
  height: 400px;
  background-color: var(--page-layout-body-background-color);
}
</style>
