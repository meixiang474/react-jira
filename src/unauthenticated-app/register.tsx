import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const RegisterScreen = () => {
  const { register } = useAuth();

  // 提交表单
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 阻止提交表单默认行为
    e.preventDefault();
    // 获取表单数据
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    // 注册
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};
