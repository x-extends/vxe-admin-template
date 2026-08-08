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
              <vxe-switch v-model="currTabsCache" open-label="缓存" close-label="不缓存"></vxe-switch>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #footer>
        <vxe-button status="primary" @click="resetEvent">恢复默认</vxe-button>
        <vxe-button @click="closeEvent">关闭</vxe-button>
      </template>
    </vxe-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { VxeUI } from 'vxe-pc-ui'

export default {
  data () {
    const showPupup = false

    const colorList = [
      '#409eff', '#29D2F8', '#31FC49', '#3FF2B3', '#B52DFE', '#FC3243', '#FA3077', '#D1FC44', '#FEE529', '#FA9A2C'
    ]

    const sizeOptions = [
      { label: '默认', value: '' },
      { label: '中', value: 'medium' },
      { label: '小', value: 'small' },
      { label: '迷你', value: 'mini' }
    ]

    return {
      showPupup,
      colorList,
      sizeOptions
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'isTabsCache',
      'primaryColor',
      'componentsSize'
    ]),
    currTheme: {
      get () {
        return this.theme
      },
      set (name) {
        this.setTheme(name)
      }
    },
    currCompSize: {
      get () {
        return this.componentsSize
      },
      set (size) {
        this.setComponentsSize(size)
      }
    },
    currPrimaryColor: {
      get () {
        return this.primaryColor
      },
      set (color) {
        this.setPrimaryColor(color || '')
      }
    },
    currTabsCache: {
      get () {
        return this.isTabsCache
      },
      set (value) {
        VxeUI.modal.message({
          content: value ? '启用页签缓存成功' : '已关闭页签缓存',
          status: 'success'
        })
        this.setTabsCache(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setTheme',
      'setTabsCache',
      'setPrimaryColor',
      'setComponentsSize'
    ]),
    open () {
      this.showPupup = true
    },
    close () {
      this.closeEvent()
    },
    resetEvent () {
      this.currCompSize = ''
      this.currPrimaryColor = ''
      this.showPupup = false
    },
    clickEvent () {
      this.showPupup = !this.showPupup
    },
    closeEvent () {
      this.showPupup = false
    }
  }
}
</script>
