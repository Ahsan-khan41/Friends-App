import React from 'react'
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../components/firebase';
import { Link } from "react-router-dom";

const Signup = () => {
    const onFinish = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <>
            <Row>
                <Col span={12} offset={4}>
                    <Form
                        style={{ marginTop: 40 }}
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
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Sign up
                            </Button>
                            <Link  to="/"><Button >
                                Sign in
                            </Button></Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Signup
