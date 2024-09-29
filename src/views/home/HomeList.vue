<template>
  <PageView class="home-page" :padding="false" :background="false">
    <vxe-row :gutter="[16, 16]" wrap>
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
  </PageView>
</template>

<script>
import StatisticsModule from './components/StatisticsModule.vue'
import TodoModule from './components/TodoModule.vue'
import UserPvChart from './components/UserPvChart.vue'
import UserAgeChart from './components/UserAgeChart.vue'

export default {
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
  overflow-x: hidden;
}
</style>
