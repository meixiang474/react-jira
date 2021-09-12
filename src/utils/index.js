import { useEffect, useState } from "react";

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

// 初始化数据
export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 同步数据防抖处理
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
