# Vxe 后台管理系统模板

一个基于 [Vxe UI](https://vxeui.com) 轻量级、极致流畅的系统模板

## 浏览器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## 在线预览

👉 [点击查看](https://vxeui.com/admin-template/)  

## 目录说明

* api 后台接口
* assets 静态资源（图片、视频等）
* components 全局组件
* i18n 国际化语言
* router 路由目录
  * config 路由配置文件（可按照业务进行模块拆分）
  * index 路由及权限控制
* store 全局数据仓库
  * app 应用通用数据
  * user 用户相关数据
* plugins 插件目录
  * vxe 组件库插件
    * form 表单渲染器
    * table 表格渲染器
    * config 全局默认参数
    * format 全局格式化
  * nprogress 进度插件
* style 样式目录
  * theme 主题文件
* util 通用函数
* views
  * layout 页面布局
  * error 错误相关页面
  * login 登录注册
  * home 首页
  * systemManage 系统管理
  * ...业务模块

## 环境变量

.env 通用环境变量配置文件  
.env.production 正式环境变量配置文件

## 更新
```
npm run update
```

### 运行
```
npm run serve
```

### 打包
```
npm run build
```

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-admin-template](https://contrib.rocks/image?repo=x-extends/vxe-admin-template)](https://github.com/x-extends/vxe-admin-template/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
