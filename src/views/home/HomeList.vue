<template>
  <vxe-scrollbar class="home-page" padding>
    <vxe-row gutter="16" grid-layout wrap>
      <vxe-col span="24">
        <StatisticsModule />
      </vxe-col>
      <vxe-col span="24">
        <TodoModule />
      </vxe-col>
      <vxe-col span="12">
        <UserPvChart />
      </vxe-col>
      <vxe-col span="12">
        <UserAgeChart />
      </vxe-col>
    </vxe-row>
  </vxe-scrollbar>
</template>

<script>
import StatisticsModule from './components/StatisticsModule.vue'
import TodoModule from './components/TodoModule.vue'
import UserPvChart from './components/UserPvChart.vue'
import UserAgeChart from './components/UserAgeChart.vue'

export default {
  name: 'HomeList',
  components: {
    StatisticsModule,
    TodoModule,
    UserPvChart,
    UserAgeChart
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}
</style>
