import { useEffect, useRef, useState } from "react";

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const isVoid = (val: unknown) => val == null || val === "";

// 过滤掉对象里的空值
export const cleanObject = (obj: Record<string, unknown>) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const val = res[key];
    if (isVoid(val)) {
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

// 改变页面 title
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      // 如果页面销毁，是否保留当前标题
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 组件的挂载状态
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

// 回到首页并刷新整个页面
export const resetRoute = () => (window.location.href = window.location.origin);

// 获取子集
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => {
    return keys.includes(key as K);
  });
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
