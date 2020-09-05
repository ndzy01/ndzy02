/**
 * @description 判断用户权限
 * @param auth
 * @param authInfo
 */
export function hasAuth(auth: string, authInfo: any[]): boolean {
  let bool = false;
  if (authInfo.length > 0) {
    for (let i = 0; i < authInfo.length; i++) {
      let item = authInfo[i];

      if (item.auth === auth) {
        bool = true;
        break;
      }
    }
  } else {
    //
    bool = false;
  }

  // 没有配置权限key，默认有权限
  if (!auth) {
    bool = true;
  }

  return bool;
}
