<template>
  <div class="page-footer">
    <span>版权所有 ©<vxe-link href="https://vxeui.com/" target="_blank">vxe</vxe-link> 2018-{{ dateStr }}</span>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      dateStr: XEUtils.toDateString(new Date(), 'yyyy')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-footer {
  text-align: center;
  padding: 8px;
  background-color: var(--page-layout-background-color);
}
</style>
