import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import { cleanObject } from "./index";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();

  // 工程列表相关异步操作及数据
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param) }),
    [client, param]
  );

  // 同步工程列表
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [fetchProjects, run]);

  return result;
};

export const useEditProject = () => {
  const { run, ...rest } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...rest,
  };
};

export const useAddProject = () => {
  const { run, ...rest } = useAsync();
  const client = useHttp();

  const add = (params: Partial<Project>) => {
    return run(
      client(`projects`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    add,
    ...rest,
  };
};
