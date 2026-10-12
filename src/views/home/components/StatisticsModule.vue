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

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      formData: {
        pvNum: 0,
        downloadNum: 0,
        userNum: 0,
        projectNum: 0
      }
    }
  },
  methods: {
    loadData  () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.formData = {
          pvNum: XEUtils.random(1000, 99999),
          downloadNum: XEUtils.random(1000, 99999),
          userNum: XEUtils.random(1000, 99999),
          projectNum: XEUtils.random(1000, 99999)
        }
      }, 300)
    }
  },
  created () {
    this.loadData()
  }
}
</script>
