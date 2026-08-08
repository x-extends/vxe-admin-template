<template>
  <div :key="currViewKey" :class="['page-view', {'is-pg': padding, 'is-bg': background}]">
    <slot></slot>
    <vxe-loading :modelValue="loading" :text="loadingText"></vxe-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
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
  },
  data () {
    const isActived = true
    const currViewKey = 0
    return {
      isActived,
      currViewKey
    }
  },
  computed: {
    ...mapGetters([
      'pageKey'
    ])
  },
  watch: {
    /**
     * 只刷新当前显示的路由页面，不刷新其他被缓存挂起的页面
     */
    pageKey () {
      if (this.isActived) {
        this.currViewKey++
      }
    }
  },
  activated () {
    this.isActived = true
  },
  deactivated () {
    this.isActived = false
  }
}
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
