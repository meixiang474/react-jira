export const isFalsy = (val) => (val === 0 ? false : !val);

// 过滤掉对象里的空值
export const cleanObject = (obj) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const val = res[key];
    if (isFalsy(val)) {
      delete res[key];
    }
  });
  return res;
};
