import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../components/firebase";
import { Switch } from "antd";

const ModalForm = () => {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  // post privacy swith
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
    // Add a new document with a generated id.
    const docRef = addDoc(collection(db, "posts"), {
      postTitle: values.postTitle,
      postDescription: values.postDescription,
      adminUid: userObj.uid,
      privacy: values.publicMode,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Post Title"
          name="postTitle"
          rules={[
            {
              required: true,
              message: "Post Title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Post Description"
          name="postDescription"
          rules={[
            {
              required: true,
              message: "Add Description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Public Mode" name="publicMode">
          <Switch defaultChecked onChange={onChange} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalForm;
