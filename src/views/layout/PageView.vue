<template>
  <div :key="currViewKey" :class="['page-view', {'is-pg': padding, 'is-bg': background}]">
    <slot></slot>
    <vxe-loading :modelValue="loading" :text="loadingText"></vxe-loading>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onActivated, onDeactivated } from 'vue'
import { useAppStore } from '@/store/app'

defineProps({
  loading: Boolean,
  loadingText: String,
  padding: {
    type: Boolean,
    default: true
  },
  background: {
    type: Boolean,
    default: true
  }
})

const isActived = ref(true)
const currViewKey = ref(0)

const appStore = useAppStore()

/**
 * 只刷新当前显示的路由页面，不刷新其他被缓存挂起的页面
 */
watch(() => appStore.pageKey, () => {
  if (isActived.value) {
    currViewKey.value++
  }
})

onActivated(() => {
  isActived.value = true
})

onDeactivated(() => {
  isActived.value = false
})
</script>

<style lang="scss" scoped>
.page-view {
  position: relative;
  height: 100%;
  min-width: 800px;
  overflow: auto;
  border-radius: 6px;
  &.is-pg {
    padding: 16px;
  }
  &.is-bg {
    background-color: var(--page-layout-body-background-color);
  }
}
</style>
