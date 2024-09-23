<template>
  <vxe-layout-container vertical>
    <vxe-layout-body padding>
      <div class="login-wrapper">
        <RouterView />
      </div>
    </vxe-layout-body>
  </vxe-layout-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.login-wrapper {
  width: 360px;
  margin: 10vh auto 0 auto;
  .login-title {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 80px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .login-desc {
    text-align: center;
    margin-bottom: 32px;
    font-size: 14px;
    color: #888;
  }
}
</style>
