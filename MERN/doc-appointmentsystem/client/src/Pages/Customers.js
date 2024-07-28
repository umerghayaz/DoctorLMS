import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Divider,
  Row,
  Modal,
  Col,
  Form,
  Button,
  Input,
  notification,
  Space,
  Pagination,
  Typography,
  Upload,
  message,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  deleteCustomers,
  getCustomers,
  getId,
  postCustomers,
  updateCustomers,
} from "../Actions/CustomerAction";
const { Title } = Typography;

const Customers = () => {
  let [form] = Form.useForm();

  const dispatch = useDispatch();
//   this is for getting reducer data
  const { data, editdata, loading, error, messageapi } = useSelector(
    (state) => state.CustomersReducer
  );
  const [loadingss, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [dataapi, setData] = useState([]);
  const [editdataapi, setDataedit] = useState([]);
  const [paginationdata, setPaginationdata] = useState({
    current: 1,
    pageSize: 12,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCustomerform, setIsModalOpenCustomerform] = useState(false);
  const [isModalOpenCustomerformEdit, setIsModalOpenCustomerformEdit] =
    useState(false);
  // for Post form
  const showModalCustomerform = () => {
    setIsModalOpenCustomerform(true);
  };
  const handleOkCustomerform = () => {
    setIsModalOpenCustomerform(false);
  };
  const handleCancelCustomerform = () => {
    setIsModalOpenCustomerform(false);
  };
  // for Edit form
//   opens edit form
// get user data through id and save in state

  const showModalCustomerformEdit = (id) => {
    setIsModalOpenCustomerformEdit(true);
    axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
      console.log(response.data.data, "inside id");
      setDataedit(response.data.data);
    });
  };

  const handleOkCustomerformEdit = () => {
    setIsModalOpenCustomerformEdit(false);
  };
  const handleCancelCustomerformEdit = () => {
    setIsModalOpenCustomerformEdit(false);
  };
  var user1 = localStorage.getItem("user_data");
  // var user1 =JSON.parse(user1)

  console.log(user1);
//   this useEffect passes data in edit form
  useEffect(() => {
    form.setFieldsValue({
      first_name: editdataapi.first_name,
      email: editdataapi.email,
      avatar: editdataapi.avatar,
    });
    console.log(editdataapi.first_name, editdataapi.email, "iside");
  }, [editdataapi.first_name, editdataapi.avatar, editdataapi]);
  console.log(editdataapi.first_name, editdataapi.email);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
//   it is post function for posting data
// i have used FormData() because i cannot pass image directly in api
  const onFinish = (values) => {
    console.log("values:", values);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("email", values.email);
    // Append the file(s) to the FormData
    if (values.avatar && values.avatar.length > 0) {
      formData.append("avatar", values.avatar);
    }
    dispatch(postCustomers(formData));
    form.resetFields();
    message.success(messageapi);
  };
//   it is edit function for updating data
// i have used FormData() because i cannot pass image directly in api
  const onFinish1 = (values) => {
    console.log("values:", values);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("email", values.email);
    // Append the file(s) to the FormData
    if (values.avatar && values.avatar.length > 0) {
      formData.append("avatar", values.avatar);
    }
    dispatch(updateCustomers(editdataapi.id, formData));
    form.resetFields();
    message.success(messageapi);
  };
//   upload file validation function 
// it will accept only images
  const normFile = (e) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];
    const isAllowedType = allowedTypes.includes(e.file.type);

    if (!isAllowedType) {
      message.error("You can only upload PNG, JPEG, JPG, or SVG files!");
      return null;
    }
    return e.fileList;
  };
  const columns = [
    {
        dataIndex: "avatar",
        key: "avatar",
        width: 120,
        maxWidth: 120,
        render: (t, r) => <img src={`${r.avatar}`} style={{ width: "100%" }} />,
      },
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
    //   for sorting id 
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
  
    {
      title: "Customer Name",
      dataIndex: "first_name",
      key: "first_name",
         //   for sorting name 
         // for sorting string we use localeCompare
      onFilter: (value, record) => record.first_name.indexOf(value) === 0,
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        //   for sorting email 
        // for sorting string we use localeCompare
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortDirections: ["descend", "ascend"],
      },

    ,
    {
      title: "Actions",
      key: "action",
      render: (text, item) => (
        <Space size="middle">
          <Button
            title="Edit"
            onClick={() => showModalCustomerformEdit(item.id)}
            type="primary"
            style={{background:'#008212'}}
          >
            Edit
          </Button>
          <Button type="primary" danger onClick={showModal}>
            Delete
          </Button>
          <Modal
            open={isModalOpen}
            footer={
              <div style={{ textAlign: "center" }}>
                <Button
                  key="cancel"
                  onClick={handleCancel}
                  style={{ marginRight: 25 }}
                >
                  Cancel
                </Button>
                <Button
                  key="delete"
                  type="primary"
                  danger
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            }
            onOk={() => handleDelete(item.id)}
            onCancel={handleCancel}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlined style={{ fontSize: "50px", color: "red" }} />
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Are you sure?
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Do you really want to delete this customer? This process can not
              be undone.
            </p>
          </Modal>
        </Space>
      ),
    },
  ];
//   for deleting data
  const handleDelete = (item) => {
    console.log(item, "id");
    dispatch(deleteCustomers(item));
    Deletenotification("success");
  };

  const Deletenotification = (type) => {
    notification[type]({
      message: "Success",
      description: "record deleted succesfully",
    });
  };
  useEffect(() => {
    dispatch(getCustomers(paginationdata, 6));
    console.log("data", data.data);
    console.log("data", editdataapi);

    setData(data.data);
    console.log(paginationdata, "page");
    fetchData(paginationdata, 6);
  }, [paginationdata, editdataapi]);
  useEffect(() => {
    console.log("editdataapi", editdataapi.data);
  }, [editdataapi]);
  const onChange1 = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const fetchData = async (page, pageSize) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${pageSize}`
      );

      setData(response.data.data);
      setPaginationdata(response.data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const onChange = (page) => {
    console.log(page);
    setPaginationdata(page);
  };

  return (
    <Row>
      <Divider orientation="center">Customers</Divider>
      <Col span={24}>
        <>
          <Button
            style={{
              justifyContent: "center",
              marginBottom: "20px",
              marginLeft: "45px",
              backgroundColor:"#306850 ",
              color:'#fff',
              width:'200px',
              height:'50px'
            }}
            onClick={showModalCustomerform}
          >
            <PlusCircleOutlined /> Add New Customer
          </Button>
          <Modal
            footer={null}
            open={isModalOpenCustomerform}
            onOk={handleOkCustomerform}
            onCancel={handleCancelCustomerform}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card style={{ width: 500 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0px 60px 0px ",
                    backgroundColor: "#015249",
                    color: "#ffff",
                    borderRadius: "5px",
                  }}
                >
                  <Title level={2}>Add New Customer </Title>
                </div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!", },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Customer Name!",
                      },
                    ]}
                  >
                    <Input type="Customer Name" placeholder="Customer Name" />
                  </Form.Item>
                  <Form.Item
                    name="avatar"
                    label="Upload Picture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload name="logo" listType="picture" maxCount={1}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                      style={{ backgroundColor: "#015249" }}
                    >
                      Add Customer
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Modal>
          <Modal
            footer={null}
            open={isModalOpenCustomerformEdit}
            onOk={handleOkCustomerformEdit}
            onCancel={handleCancelCustomerformEdit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card style={{ width: 500 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0px 60px 0px ",
                    backgroundColor: "#015249",
                    color: "#ffff",
                    borderRadius: "5px",
                  }}
                >
                  <Title level={2}>EditCustomer </Title>
                </div>

                <Form
                  name="normal_login"
                  className="login-form"
                  onFinish={onFinish1}
                  form={form}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Customer Name!",
                      },
                    ]}
                  >
                    <Input type="Customer Name" placeholder="Customer Name" />
                  </Form.Item>
                  <Form.Item
                    name="avatar"
                    label="Upload Picture"
                    // valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload name="logo" listType="picture" maxCount={1}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                      style={{ backgroundColor: "#015249" }}
                    >
                      Edit Customer
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Modal>
        </>
      </Col>
      <Col md={24} lg={24} xl={24}>
        <Card>
          <Table
            columns={columns}
            dataSource={dataapi}
            pagination={false}
            size="small"
            bordered
            onChange={onChange1}
            style={{ fontSize: "4px" }}
          />
          <Pagination
            current={paginationdata?.page}
            onChange={onChange}
            total={20}
            style={{display:'flex',justifyContent:'center',marginTop:'20px'}}
          />
          ;
        </Card>
      </Col>
    </Row>
  );
};

export default Customers;
