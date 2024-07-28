import React,{useEffect,useState} from "react";
import { Typography } from "antd";
import {
  Form,
  Input,
  Card,
  Button,
  message,Upload
} from "antd";
import "./AddCustomers.css";
import {  UploadOutlined} from "@ant-design/icons";

import { useDispatch,useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { getId } from "../Actions/CustomerAction";

const { Title } = Typography;

const AddCustomers = () => {
  let [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = useParams()
  const [dataapi, setData] = useState([]);

  const { data,editdata, loading, error,messageapi } = useSelector((state) => state.CustomersReducer);
  var user1 = localStorage.getItem('user_data');
  // let user=JSON.parse(user1)
  console.log('user: ', user1);
  useEffect(() => {
    dispatch(getId(id.id))
    setData(data.data)
console.log(dataapi,'data')
  }, [id]);
  useEffect(() => {
    form.setFieldsValue({
      'first_name':user1.first_name, 'email': user1.email,'avatar':user1.avatar

    })
    console.log(user1.first_name,user1.email)
  }, [dataapi.first_name,dataapi.avatar])
  const style = {
    outline: "none",
    border: "1px solid #15347c",
  };
  const onFinish = (values) => {
    console.log("values:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {  
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    const isAllowedType = allowedTypes.includes(e.file.type);

  if (!isAllowedType) {
    message.error('You can only upload PNG, JPEG, JPG, or SVG files!');
    return null;
  }
  return e.fileList;      };
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Card style={{ width: 500 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>Company Logo </Title>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "Please input your Customer Name!" }]}
        >
          <Input
            type="Customer Name"
            placeholder="Customer Name"
          />
         
        </Form.Item>
        {/* <Form.Item
        name="upload"
        label="Upload Picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo"  listType="picture"  maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            style={{backgroundColor:"#015249" }}

          >
            Add Customers
          </Button>
          
        </Form.Item>
      </Form>
    </Card>
  </div>
  );
};

export default AddCustomers;
