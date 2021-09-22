import { useCallback, useState } from "react";
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

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

  // 更改数据，说明请求已经成功
  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  // 请求失败
  const setError = useCallback(
    (error: Error) => setState({ data: null, error, stat: "error" }),
    []
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
      setState((state) => ({ ...state, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          if (mountedRef.current) {
            setError(error);
          }
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    [setData, setError, config.throwOnError, mountedRef]
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
