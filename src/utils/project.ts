import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import { cleanObject } from "./index";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();

  // 工程列表相关异步操作及数据
  const { run, ...result } = useAsync<Project[]>();

  // 同步工程列表
  useEffect(() => {
    run(client("projects", { data: cleanObject(param) }));
  }, [param, client, run]);

  return result;
};
