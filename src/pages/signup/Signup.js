import React from "react";
import { Form, Input, Button, DatePicker,message } from "antd";
import { Row, Col, Select } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/firebase";
import { db } from "../../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const Signup = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential)  => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        user.displayName = values.username
         setDoc(doc(db, "users", user.uid), {
          name: values.username,
          email: values.email,
          uid: user.uid,
          profile: 'https://joeschmoe.io/api/v1/random',
          background: 'https://joeschmoe.io/api/v1/random',
          mobile: values.mobileNo,
          info: '',
          DOB: values.dob._d.toDateString(),
          Mstatus: values.status,
          city: values.city,
          language: '',



        }).then(()=>{
          message.success('Account created successfully!');
          navigate("/");
          window.location.reload(false);
        })

      })
      .catch((error) => {

        message.error('submit failed!');
        message.error(error.message);
        console.log(error);
      });

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(value, dateString) {
    // console.log('Selected Time: ', value._d.toDateString());
    // console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }
  return (
    <>
      <Row>
        <Col span={12} offset={4}>
          <Form
            style={{ marginTop: 140 }}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile No"
              name="mobileNo"
              rules={[{ required: true, message: "Please input your Mobile No!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your City!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date Of Birth"
              name="dob"
              rules={[{ required: true, message: "Please input your Date of Birth!" }]}
            >
              <DatePicker onChange={onChange} onOk={onOk} />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please Select your gender" }]}
            >
              <Select defaultValue="Please Select Value" style={{ width: 120 }} >
                <Option >Please Select Value</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
              <Link to="/signin">
                <Button style={{ marginLeft: 10 }}>Sign in</Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
