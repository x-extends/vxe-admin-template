<template>
  <vxe-layout-container class="login-layout-page" vertical>
    <vxe-layout-body v-if="layoutMode === 'left'">
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-view">
          <div class="login-form-wrapper">
            <RouterView />
          </div>
        </div>
        <div class="login-layout-side">
          <div class="login-layout-bg" :style="bgStyle"></div>
        </div>
      </div>
    </vxe-layout-body>
    <vxe-layout-body v-else-if="layoutMode === 'right'">
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-side">
          <div class="login-layout-bg" :style="bgStyle"></div>
        </div>
        <div class="login-layout-view">
          <div class="login-form-wrapper">
            <RouterView />
          </div>
        </div>
      </div>
    </vxe-layout-body>
    <vxe-layout-body v-else>
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-bg" :style="bgStyle"></div>
        <div class="login-form-wrapper">
          <RouterView />
        </div>
      </div>
    </vxe-layout-body>

    <div class="oper-btn-wrapper">
      <div>
        <vxe-radio-group class="layout-btn" type="button" v-model="layoutMode">
          <vxe-radio-button checked-value="left" icon="vxe-icon-align-left" content="居左"></vxe-radio-button>
          <vxe-radio-button checked-value="center" icon="vxe-icon-align-center" content="居中"></vxe-radio-button>
          <vxe-radio-button checked-value="right" icon="vxe-icon-align-right" content="居右"></vxe-radio-button>
        </vxe-radio-group>
      </div>
      <div>
        <vxe-radio-group class="bg-btn" v-model="selectBg" :options="bgOptions" type="button"></vxe-radio-group>
      </div>
    </div>
  </vxe-layout-container>
</template>

<script>
import bgJpg from '@/assets/bg.jpg'

export default {
  data () {
    const layoutMode = 'center'

    const bgOptions = [
      { label: '城市', value: `linear-gradient(rgba(20,30,40,0.45), rgba(20,30,40,0.55)), url("${bgJpg}") center/cover no-repeat` },
      { label: '几何', value: 'repeating-linear-gradient(45deg, #e0e7f0 0px, #e0e7f0 2px, #f5f7fc 2px, #f5f7fc 12px), linear-gradient(to bottom, #f5f7fc, #e8edf9)' },
      { label: '光晕', value: 'radial-gradient(circle at 30% 20%, #ffd6a8, #f0e6d0 70%, #d9c9b0)' },
      { label: '渐变', value: 'linear-gradient(to right, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.4) 50%, rgba(64, 158, 255, 0) 100%)' },
      { label: '简约', value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }
    ]
    const selectBg = bgOptions[0].value

    return {
      layoutMode,
      bgOptions,
      selectBg
    }
  },
  computed: {
    bgStyle () {
      return {
        background: this.selectBg
      }
    }
  }
}
</script>

<style lang="scss">
.login-layout-page {
  --login-form-background-color: rgba(255, 255, 255, 0.9);
}
.login-layout-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.login-form-wrapper {
  .login-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    margin-bottom: 12px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
      border-radius: 2px;;
    }
  }
  .login-desc {
    text-align: center;
    margin-bottom: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }
  .login-form {
    background-color: transparent;
  }
}

.oper-btn-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 16px;
  text-align: right;
  .layout-btn {
    background-color: var(--login-form-background-color);
  }
  .bg-btn {
    margin-top: 8px;
    background-color: var(--login-form-background-color);
  }
}

.login-layout-left,
.login-layout-right {
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 400px;
  .login-form-wrapper {
    width: 400px;
  }
  .login-layout-view {
    flex-shrink: 0;
    min-width: 400px;
    width: 40%;
    background-color: var(--login-form-background-color);
  }
  .login-layout-side {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
  }
  .login-form-wrapper {
    margin: 18vh auto 0 auto;
    border-radius: 2%;
    background-color: var(--login-form-background-color);
  }
}

.login-layout-bg {
  transition: background 0.7s ease;
}

.login-layout-center {
  min-height: 400px;
  padding-bottom: 18vh;
  .login-form-wrapper {
    width: 580px;
    padding: 72px 72px 48px 72px;
  }
  .login-form-wrapper {
    position: relative;
    margin: 18vh auto 0 auto;
    border-radius: 2%;
    background-color: var(--login-form-background-color);
  }
}

.login-privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
}
</style>
