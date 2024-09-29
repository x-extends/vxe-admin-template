/**
 * 转换指定路由名称
 * @param item
 * @returns
 */
export function routeToMenuName (route) {
  return String(route.name)
}

/**
 * 转换路由配置名称
 * @param item
 * @returns
 */
export function routeConfigToMenuName (item) {
  return item.routeName
}
