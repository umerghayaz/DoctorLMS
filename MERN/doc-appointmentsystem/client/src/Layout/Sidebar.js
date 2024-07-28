
import { useMediaQuery } from "react-responsive";
import { Layout, Menu, Breadcrumb, Col, Tooltip, Row, Drawer } from "antd";
import './Sidebar.css';
// import logo from "../Assets/logo.png"
import logo from '../Assets/images.png'
import { Link  } from 'react-router-dom';
import {
  PieChartOutlined,
  DesktopOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { MdPeople } from "react-icons/md";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ collapsed, onClose }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const items = (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ background: "#015249", display: "flex", flexDirection: "column", alignItems: "center"  }}

      >
        <div
          className="logo"
          style={{
            textAlign: "center",
            height: "30px",
            marginBottom: "100px",
            position: "relative",
            top: "32px",
          }}
        >
          {collapsed ? (
            <img src={logo} alt="App logo" width={70} />
          ) : (
            <img src={logo} alt="App logo" height={40} width={120} />
          )}
          {/* <img src={logo} alt="App logo" width={120} style={{
                            verticalAlign: 'center '
                        }} /> */}{" "}
        </div>

        <Menu.Item key="1" style={{backgroundColor:'#043933',width:"170px",}}>
        <Link to='/'/>

        <MdPeople style={{ fontSize: '17px', marginRight: '8px',marginTop:'10px', color: '#FFff'  }} /> {/* Added marginRight for gap */}
          <span style={{fontSize: '17px', marginRight: '3px',marginBottom:'30px', color: '#FFff'}}>Customers</span>
          
        </Menu.Item>
        
      </Menu>
    </>
  );
  return (
    <>
{/* when the screen gets smaller drawer will show automatically I have used react-responsive libarary */}
      {isTabletOrMobile && (
        <Drawer
          className="hideOnDesktop"
          title={false}
          closeIcon={<CloseOutlined />}
          placement="left"
          onClose={onClose}
          visible={collapsed}
          style={{background: "#015249" }}

        >
          {items}{" "}
        </Drawer>
      )}
      {/* when the screen is bigger sider will show automatically */}

      {!isTabletOrMobile && (
        <Sider
          width={200}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{background: "#015249" }}
        >
          {items}{" "}
        </Sider>
      )}{" "}
    </>
  );
}

export default Sidebar;