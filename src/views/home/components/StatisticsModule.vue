<template>
  <vxe-row gutter="16" grid-layout wrap>
    <vxe-col span="6">
      <vxe-card title="访问量" :loading="loading" :border="false" width="100%">
        <div>{{ formData.pvNum }}</div>
      </vxe-card>
    </vxe-col>
    <vxe-col span="6">
      <vxe-card title="下载量" :loading="loading" :border="false" width="100%">
        <div>{{ formData.downloadNum }}</div>
      </vxe-card>
    </vxe-col>
    <vxe-col span="6">
      <vxe-card title="用户数量" :loading="loading" :border="false" width="100%">
        <div>{{ formData.userNum }}</div>
      </vxe-card>
    </vxe-col>
    <vxe-col span="6">
      <vxe-card title="项目数量" :loading="loading" :border="false" width="100%">
        <div>{{ formData.projectNum }}</div>
      </vxe-card>
    </vxe-col>
  </vxe-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import XEUtils from 'xe-utils'

interface FormDataVO {
  pvNum: number
  downloadNum: number
  userNum: number
  projectNum: number
}

const loading = ref(false)
const formData = ref<FormDataVO>({
  pvNum: 0,
  downloadNum: 0,
  userNum: 0,
  projectNum: 0
})

const loadData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    formData.value = {
      pvNum: XEUtils.random(1000, 99999),
      downloadNum: XEUtils.random(1000, 99999),
      userNum: XEUtils.random(1000, 99999),
      projectNum: XEUtils.random(1000, 99999)
    }
  }, 300)
}

loadData()
</script>
