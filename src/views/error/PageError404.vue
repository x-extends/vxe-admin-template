<template>
  <div class="page-404">
    <img class="page-404-img" src="../../assets//empty.png">
    <div class="page-404-describe">抱歉，您访问的页面不存在或已被移除！</div>
    <div>
      <vxe-button status="primary" :router-link="{name: 'HomeList'}" size="xlarge">返回首页</vxe-button>
      <vxe-button size="xlarge" @click="logoutEvent">退出登录</vxe-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'logoutServer'
    ]),
    logoutEvent () {
      this.logoutServer().then(() => {
        this.$router.push({
          name: 'LoginView'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-404 {
  text-align: center;
  color: var(--vxe-ui-font-color);
}
.page-404-img {
  max-width: 400px;
  max-height: 400px;
}
.page-404-describe {
  font-size: 30px;
  margin-bottom: 34px;
}
</style>
