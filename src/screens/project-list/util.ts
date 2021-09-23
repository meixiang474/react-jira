import { useMemo } from "react";
import { cleanObject } from "utils";
import { useProject } from "utils/project";
import { useUrlQueryParam, useSetUrlSearchParam } from "utils/url";

export const useProjectsSearchParams = () => {
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
  const setUrlSearchParam = useSetUrlSearchParam();
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlSearchParam({
      projectCreate: undefined,
      editingProjectId: undefined,
    });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProjectQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", cleanObject(params)];
};
