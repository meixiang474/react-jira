import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  // 请求错误是否向下抛出异常
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    } as State<T>
  );

  const [retry, setRetry] = useState(() => () => {});

  const safeDispatch = useSafeDispatch(dispatch);

  // 更改数据，说明请求已经成功
  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  // 请求失败
  const setError = useCallback(
    (error: Error) => safeDispatch({ data: null, error, stat: "error" }),
    [safeDispatch]
  );

  // 用来调度异步请求
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    [safeDispatch, config.throwOnError, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    // 重新跑一遍run, 刷新state
    retry,
    ...state,
  };
};
