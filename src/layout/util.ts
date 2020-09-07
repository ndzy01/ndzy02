import { menuRouter } from '@/layout';

/**
 * @description 获取打开的菜单
 * @param path
 */
export function getOpenKeysG(path: string) {
  if (!path) {
    return [];
  }
  let openKey = '';

  menuRouter.forEach((item) => {
    if (item.path === path.split('?')[0]) {
      openKey = item.parent;
    }
  });

  return [openKey];
}
/**
 * @description 获取选中的菜单项
 * @param path
 */
export function getSelectKeysG(path: string) {
  if (!path) {
    return [];
  }
  return [path.split('?')[0]];
}
