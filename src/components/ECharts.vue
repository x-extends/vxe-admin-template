<template>
  <div ref="chartElem" class="e-charts" :style="{height: `${height}px`}"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

const props = defineProps({
  height: Number,
  options: Object
})

const chartElem = ref<HTMLDivElement>()
let chartInstance: EChartsType | null = null

const loadChart = () => {
  if (!chartInstance) {
    const elem = chartElem.value
    if (elem) {
      chartInstance = echarts.init(elem)
    }
  }
  if (chartInstance) {
    chartInstance.setOption(Object.assign({}, props.options))
  }
}

const winResizeEvent = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

watch(() => props.options, () => {
  loadChart()
})

onMounted(() => {
  loadChart()
  window.addEventListener('resize', winResizeEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', winResizeEvent)
})
</script>

<style lang="scss" scoped>
.e-charts {
  width: 100%;
  height: 400px;
  background-color: var(--page-layout-body-background-color);
}
</style>
