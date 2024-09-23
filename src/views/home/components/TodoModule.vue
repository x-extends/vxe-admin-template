<template>
  <vxe-card :border="false" :padding="false" width="100%">
    <vxe-tabs v-model="selectType" height="400" padding>
      <vxe-tab-pane title="待处理" name="1">
        <vxe-grid v-bind="gridOptions1">
          <template #action>
            <vxe-button mode="text" status="primary">通过</vxe-button>
            <vxe-button mode="text" status="error">驳回</vxe-button>
          </template>
        </vxe-grid>
      </vxe-tab-pane>
      <vxe-tab-pane title="已处理" name="2">
        <vxe-grid v-bind="gridOptions2"></vxe-grid>
      </vxe-tab-pane>
    </vxe-tabs>
  </vxe-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridProps } from 'vxe-table'

interface RowVO {
  id: number
  name: string
  type: string
  status: string
}

const selectType = ref('1')

const list = [
  { id: 10001, name: 'Test1', type: 'Develop', status: 'Man' },
  { id: 10002, name: 'Test2', type: 'Test', status: 'Women' },
  { id: 10003, name: 'Test3', type: 'PM', status: 'Man' },
  { id: 10004, name: 'Test4', type: 'Designer', status: 'Women' }
]

// 模拟接口
const findPageList = (pageSize: number, currentPage: number) => {
  console.log(`调用查询接口 pageSize=${pageSize} currentPage=${currentPage}`)
  return new Promise<{
    data: RowVO[]
    page: {
      total: number
    }
  }>(resolve => {
    setTimeout(() => {
      resolve({
        data: list.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        page: {
          total: list.length
        }
      })
    }, 100)
  })
}

const gridOptions1 = reactive<VxeGridProps<RowVO>>({
  loading: false,
  showOverflow: true,
  height: '100%',
  toolbarConfig: {
    refresh: true
  },
  pagerConfig: {},
  columns: [
    { type: 'seq', width: 70 },
    { field: 'type', title: '类型', width: 120 },
    { field: 'name', title: '名称' },
    { field: 'status', title: '状态', width: 120 },
    { field: 'action', title: '操作', width: 140, slots: { default: 'action' } }
  ],
  proxyConfig: {
    ajax: {
      query ({ page }) {
        return findPageList(page.pageSize, page.currentPage)
      }
    }
  }
})

const gridOptions2 = reactive<VxeGridProps<RowVO>>({
  loading: false,
  showOverflow: true,
  height: '100%',
  toolbarConfig: {
    refresh: true
  },
  pagerConfig: {},
  columns: [
    { type: 'seq', width: 70 },
    { field: 'type', title: '类型', width: 120 },
    { field: 'name', title: '名称' },
    { field: 'status', title: '状态', width: 120 }
  ],
  proxyConfig: {
    ajax: {
      query ({ page }) {
        return findPageList(page.pageSize, page.currentPage)
      }
    }
  }
})
</script>
