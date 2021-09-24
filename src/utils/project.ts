import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "utils";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOptimisticOptions";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", cleanObject(param || {})], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { method: "PATCH", data: params }),
    {
      ...useEditConfig(queryKey),
      onSuccess() {
        queryClient.invalidateQueries(queryKey);
        // 刷新收藏的项目
        queryClient.invalidateQueries([queryKey[0], {}]);
      },
    }
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { method: "POST", data: params }),
    {
      ...useAddConfig(queryKey),
      onSuccess() {
        queryClient.invalidateQueries(queryKey);
        // 因为useEdit使用了此hook，useAdd就也得保持一致
        queryClient.invalidateQueries([queryKey[0], {}]);
      },
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }),
    {
      ...useDeleteConfig(queryKey),
      onSuccess() {
        queryClient.invalidateQueries(queryKey);
        queryClient.invalidateQueries([queryKey[0], {}]);
      },
    }
  );
};
