import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  // 负责人列表
  const [users, setUsers] = useState([]);

  // 查询参数 name, personId
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 防抖处理的查询参数
  const debouncedParam = useDebounce(param, 200);

  // 工程列表
  const [list, setList] = useState([]);

  const client = useHttp();

  // 同步工程列表
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam, client]);

  // 初始化负责人列表
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
