import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

// 用户 token 在 localstorage 中存储的 key
export const localStorageKey = "__auth_provider_token__";

// 获取 jwt token
export const getToken = () => localStorage.getItem(localStorageKey);

// 存储 jwt token
export const handlerUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 登出
export const logout = async () => localStorage.removeItem(localStorageKey);
