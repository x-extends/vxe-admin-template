<template>
  <div>
    <vxe-button icon="vxe-icon-setting-fill" @click="clickEvent"></vxe-button>

    <vxe-drawer v-model="showPupup" title="个性化设置" mask-closable show-footer resize>
      <template #default>
        <vxe-form title-width="100" title-background border>
          <vxe-form-item title="尺寸大小" span="24">
            <template #default>
              <vxe-radio-group v-model="currCompSize" :options="sizeOptions" type="button"></vxe-radio-group>
            </template>
          </vxe-form-item>
          <vxe-form-item title="主题模式" span="24">
            <template #default>
              <vxe-radio-group v-model="currTheme">
                <vxe-radio-button checked-value="light" icon="vxe-icon-sunny"></vxe-radio-button>
                <vxe-radio-button checked-value="dark" icon="vxe-icon-moon"></vxe-radio-button>
              </vxe-radio-group>
            </template>
          </vxe-form-item>
          <vxe-form-item title="主题色" span="24">
            <template #default>
              <vxe-color-picker v-model="currPrimaryColor" :colors="colorList"></vxe-color-picker>
            </template>
          </vxe-form-item>
          <vxe-form-item title="页签缓存" span="24">
            <template #default>
              <vxe-switch v-model="currTabsCache"></vxe-switch>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #footer>
        <vxe-button @click="resetEvent">恢复默认</vxe-button>
        <vxe-button status="primary" @click="closeEvent">关闭</vxe-button>
      </template>
    </vxe-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import { VxeUI } from 'vxe-pc-ui'

const appStore = useAppStore()

const showPupup = ref(false)

const colorList = ref([
  '#409eff', '#29D2F8', '#31FC49', '#3FF2B3', '#B52DFE', '#FC3243', '#FA3077', '#D1FC44', '#FEE529', '#FA9A2C'
])

const sizeOptions = ref([
  { label: '默认', value: '' },
  { label: '中', value: 'medium' },
  { label: '小', value: 'small' },
  { label: '迷你', value: 'mini' }
])

const currTheme = computed({
  get () {
    return appStore.theme
  },
  set (name) {
    appStore.setTheme(name)
  }
})

const currCompSize = computed({
  get () {
    return appStore.componentsSize
  },
  set (size) {
    appStore.setComponentsSize(size)
  }
})

const currPrimaryColor = computed({
  get () {
    return appStore.primaryColor
  },
  set (color) {
    appStore.setPrimaryColor(color || '')
  }
})

const currTabsCache = computed({
  get () {
    return appStore.isTabsCache
  },
  set (value) {
    VxeUI.modal.message({
      content: value ? '启用页签缓存成功' : '已关闭页签缓存',
      status: 'success'
    })
    appStore.setTabsCache(value)
  }
})

const resetEvent = () => {
  currCompSize.value = ''
  currPrimaryColor.value = ''
  showPupup.value = false
}

const clickEvent = () => {
  showPupup.value = !showPupup.value
}

const closeEvent = () => {
  showPupup.value = false
}

defineExpose({
  open () {
    showPupup.value = true
  },
  close () {
    closeEvent()
  }
})
</script>
