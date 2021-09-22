import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/useAsync";
import { useDispatch } from "react-redux";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // 提交表单
  const handleSubmit = (values: { username: string; password: string }) => {
    // 登录
    run(login(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
