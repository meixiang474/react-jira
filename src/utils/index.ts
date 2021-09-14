import { useEffect, useState } from "react";

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

// 过滤掉对象里的空值
export const cleanObject = (obj: object) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    // @ts-ignore
    const val = res[key];
    if (isFalsy(val)) {
      // @ts-ignore
      delete res[key];
    }
  });
  return res;
};

// 初始化数据
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 同步数据防抖处理
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// 数组操作自定义hook
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
