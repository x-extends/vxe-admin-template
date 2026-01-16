<template>
  <vxe-layout-container vertical>
    <vxe-layout-body v-if="layoutMode === 'left'" class="login-layout-page">
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-view">
          <div class="login-form-wrapper">
            <RouterView />
          </div>
        </div>
        <div class="login-layout-side">
          <div class="login-layout-bg"></div>
        </div>
      </div>
    </vxe-layout-body>
    <vxe-layout-body v-else-if="layoutMode === 'right'" class="login-layout-page">
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-side">
          <div class="login-layout-bg"></div>
        </div>
        <div class="login-layout-view">
          <div class="login-form-wrapper">
            <RouterView />
          </div>
        </div>
      </div>
    </vxe-layout-body>
    <vxe-layout-body v-else class="login-layout-page">
      <div :class="['login-layout-wrapper',`login-layout-${layoutMode}`]">
        <div class="login-layout-bg"></div>
        <div class="login-form-wrapper">
          <RouterView />
        </div>
      </div>
    </vxe-layout-body>

    <div style="position: absolute;right: 0;top: 0;">
      <vxe-radio-group v-model="layoutMode">
        <vxe-radio-button checked-value="left" content="居左"></vxe-radio-button>
        <vxe-radio-button checked-value="center" content="居中"></vxe-radio-button>
        <vxe-radio-button checked-value="right" content="居右"></vxe-radio-button>
      </vxe-radio-group>
    </div>
  </vxe-layout-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const layoutMode = ref<'left' | 'center' | 'right'>('center')
</script>

<style lang="scss">
.login-layout-page {
  --login-background-rgb: 64, 158, 255;
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
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 4px;;
    }
    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .login-desc {
    text-align: center;
    margin-bottom: 24px;
    font-size: 14px;
    color: #888;
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
    background-color: var(--vxe-ui-layout-background-color);
  }
  .login-layout-side {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
  }
  .login-form-wrapper {
    margin: 18vh auto 0 auto;
    border-radius: 4%;
    background-color: var(--vxe-ui-layout-background-color);
  }
}

.login-layout-left {
  .login-layout-bg {
    background: linear-gradient(
      to right,
      rgba(var(--login-background-rgb), 0.1) 0%,
      rgba(var(--login-background-rgb), 0.4) 50%,
      rgba(var(--login-background-rgb), 0) 100%
    )
  }
}

.login-layout-right {
  .login-layout-bg {
    background: linear-gradient(
      to left,
      rgba(var(--login-background-rgb), 0.1) 0%,
      rgba(var(--login-background-rgb), 0.4) 50%,
      rgba(var(--login-background-rgb), 0) 100%
    )
  }
}

.login-layout-center {
  min-height: 400px;
  padding-bottom: 18vh;
  .login-form-wrapper {
    width: 580px;
    padding: 72px;
  }
  .login-form-wrapper {
    position: relative;
    margin: 18vh auto 0 auto;
    border-radius: 4%;
    background-color: var(--vxe-ui-layout-background-color);
  }
  .login-layout-bg {
    background: linear-gradient(
      to bottom,
      rgba(var(--login-background-rgb), 0) 0%,
      rgba(var(--login-background-rgb), 0.4) 50%,
      rgba(var(--login-background-rgb), 0) 100%
    )
  }
}
</style>
