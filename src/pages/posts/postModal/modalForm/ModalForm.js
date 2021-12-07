import React from "react";
import { Form, Input, Button, Upload, Switch } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../components/firebase";

const ModalForm = () => {
  const [form] = Form.useForm();

  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  // post privacy swith
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const onFinish = (values) => {
    const file = values.upload[0].originFileObj;
    const storageRef = ref(storage);
    // Points to 'images'
    const imagesRef = ref(storageRef, 'images/posts');

    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    const fileName = new Date().getTime();
    const spaceRef = ref(imagesRef, `${fileName}`);
    // File path is 'images/space.jpg'
    const path = spaceRef.fullPath;
    // File name is 'space.jpg'
    const name = spaceRef.name;
    // Points to 'images'
    const imagesRefAgain = spaceRef.parent;
    const storageRef1 = ref(storage, `${fileName}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef1, file).then((snapshot) => {
      //downloading url from firebase storage
      getDownloadURL(ref(storage, `${fileName}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          console.log(url)

          // setting post data to firestore
          // Add a new document in collection "posts"
          setDoc(doc(db, "posts", `${fileName}`), {
            postTitle: values.postTitle,
            postDescription: values.postDescription,
            adminUid: userObj.uid,
            privacy: values.publicMode,
            imgUrl: url,
            like: [],
            postUid: fileName,
            adminEmail:userObj.email
            // adminName:
          });

          console.log(url)
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
        });
      console.log('Uploaded a blob or file!');
      onReset()
    });






    console.log("Success:", values);

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onReset = () => {
    form.resetFields();
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
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}

        >
          <Upload name="logo" listType="picture" accept="image/*" multiple={false}
            maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
