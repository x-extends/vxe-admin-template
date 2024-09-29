<template>
  <vxe-row :gutter="[16, 16]">
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
          pvNum: 1245367,
          downloadNum: 3245687,
          userNum: 256315,
          projectNum: 357
        }
      }, 200)
    }
  },
  created () {
    this.loadData()
  }
}
</script>
