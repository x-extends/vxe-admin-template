<template>
  <div class="page-footer">
    <span>版权所有 ©<vxe-link href="https://vxeui.com/" target="_blank">vxe</vxe-link> 2018-{{ dateStr }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import XEUtils from 'xe-utils'

const dateStr = ref(XEUtils.toDateString(new Date(), 'yyyy'))
</script>

<style lang="scss" scoped>
.page-footer {
  text-align: center;
  padding: 8px;
  background-color: var(--page-layout-background-color);
}
</style>
