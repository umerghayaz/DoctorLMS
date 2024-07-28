import React from 'react'
import { Layout} from "antd";
import Customers from '../Pages/Customers';
import { BrowserRouter as Router, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AddCustomers from '../Pages/AddCustomers';
const { Content } = Layout;
// this for content component
const MainContent = () => {
  return (
    <Content >
    <Routes>
      <Route exact >
        <Route path='/' element={<Customers />} />
      </Route>
      </Routes>
</Content>
  )
}

export default MainContent
