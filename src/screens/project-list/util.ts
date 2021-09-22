import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSeatchParams = () => {
  // 获取查询参数
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // 转化查询参数
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
