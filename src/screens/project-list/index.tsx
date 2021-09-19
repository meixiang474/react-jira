import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // 获取查询参数
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // 防抖处理的查询参数
  const debouncedParam = useDebounce(param, 200);

  useDocumentTitle("项目列表", false);

  // 请求数据完成两层封装
  // 第一层封装 http 请求
  // 第二层封装 loading error

  // 请求 project 列表
  const { error, isLoading, data: list } = useProjects(debouncedParam);

  // 请求负责人列表
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
