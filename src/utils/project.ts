import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
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

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { method: "PATCH", data: params }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { method: "POST", data: params }),
    useAddConfig(queryKey)
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

  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
