import React from "react";
import { Layout, Row, Col, Button, Typography, Menu, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const { Header} = Layout;
function Header1({ collapsed, setCollapsed }) {
//   const items = [{label: <a onClick={() => { dispatch(logoutUser())}}>Logout</a>,key: "0"}];
  return (
    <Header style={{ padding: 0,   background: '#fff'}}>
   
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: '16px',
      width: 64,
      height: 64,
      color: '#000',
      
    }}/> 

     <>
  
  </>
    </Header>
  );
}

export default Header1;