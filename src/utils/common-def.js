/*
 * 把list转换为object
 *
 * @param lists 待转换的list
 * @param keyName list中key的名称
 * @returns 转换后的objects
 */
export const List2Objects = function (lists, keyName) {
  const tmpObjects = {};
  lists.forEach((item) => {
    const keyValue = item[keyName];
    tmpObjects[keyValue] = item;
  });

  return tmpObjects;
};

/**
 * 取消重复请求状态
 */
export const CANEAL_TOCKEN_STATUS = 3;
