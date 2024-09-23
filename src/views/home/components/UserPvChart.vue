<template>
  <vxe-card title="用户访问量" :loading="loading" :border="false" :padding="false" width="100%">
    <template #extra>
      <vxe-button mode="text" icon="vxe-icon-refresh" @click="loadData()"></vxe-button>
    </template>

    <template #default>
      <ECharts :options="chartOptions"></ECharts>
    </template>
  </vxe-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ECharts from '@/components/ECharts.vue'

const chartOptions = ref()
const loading = ref(false)

const loadData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    chartOptions.value = {
      grid: {
        left: '15%',
        right: '10%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['9点', '11点', '13点', '15点', '17点', '19点', '20点']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '平均流量',
          type: 'line',
          data: [1240, 81245, 13257, 88115, 31278, 9902, 2300]
        },
        {
          name: '流量峰值',
          type: 'line',
          data: [865, 21245, 9257, 18115, 19278, 4002, 2070]
        }
      ]
    }
  }, 300)
}

loadData()
</script>
