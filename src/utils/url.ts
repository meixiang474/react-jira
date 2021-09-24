import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

// 自动添加 url 查询参数，读取 url 查询参数
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  // 获取查询参数 map
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(() => {
      return subset(Object.fromEntries(searchParams), stateKeys) as {
        [key in T]: string;
      };
    }, [searchParams, stateKeys]),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
