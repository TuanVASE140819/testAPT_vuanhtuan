// viết Header

import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <Layout.Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
