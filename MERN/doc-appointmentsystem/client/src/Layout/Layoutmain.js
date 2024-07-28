import React ,{useState}from 'react'
import { Button, Layout, Modal, Space } from "antd";
import Sidebar from './Sidebar';
import Header1 from './Header1';
import Customers from '../Pages/Customers';
import MainContent from './MainContent';

const { Content } = Layout;

const Layoutmain = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onClose = () => {
        setCollapsed(false);
      };
    const layoutStyle = {
        minHeight: '100vh',
    }
   
  return (
    <>   
{/* this the main layout file */}
     <Layout hasSider>
     <Sidebar collapsed={collapsed} onClose={onClose} />
      <Layout style={layoutStyle} >
        <Header1 collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
        >
        <MainContent/>
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default Layoutmain
