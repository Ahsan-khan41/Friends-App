import React from "react";
import { Form, Input, Button, message } from "antd";
import { Row, Col } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/firebase";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();

  const onFinish = (values) => {
    // try {
    // const res = await fetch(
    //   "https://apppracticeexpress.herokuapp.com/users",
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const data = await res.json();
    // console.log(res);
    // console.log(data);

    // data.map((element) => {
    //   if (
    //     element.user === values.email &&
    //     values.email.password === values.password
    //   ) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");

        // ...
      })
    .catch((error) => { 
      message.error("user or password is incorrect");
    });
    // console.log("Success:", values);
    // } else {
    //   message.error("user or password is incorrect");
    // }
    // });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
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
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
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
                Signin
              </Button>
              <Link to="/signup">
                <Button style={{ marginLeft: 10 }}>Sign up</Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
