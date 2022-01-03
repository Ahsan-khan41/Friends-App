import React, { useContext } from "react";
import { Form, Input, Button, Upload, Switch } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../components/firebase";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";
import { db } from "../../../../components/firebase";
import CurentUserContext from "../../../../components/context/CurrentUserContext";

const ModalForm = (props) => {
  const [form] = Form.useForm();

  const userObj = useContext(CurentUserContext)

  // post privacy swith
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const onFinish = (values) => {
    
    if(values.publicMode === undefined) {
      values.publicMode = true;
    };
    const file = values.upload[0].originFileObj;
    // generation unique uid for posts
    const fileName = new Date().getTime();

    const storageRef1 = ref(storage, `posts/${fileName}`);
    uploadBytes(storageRef1, file).then((snapshot) => {
      //downloading url from firebase storage
      getDownloadURL(ref(storage, `posts/${fileName}`))
        .then((url) => {

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
            adminEmail: userObj.email,
            adminProfile:userObj.profile,
            adminName:userObj.name,
            timestamp: serverTimestamp(),
            userObj:doc(db, `users/${userObj.uid}`)
            // adminName:
          });

          console.log(url)
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
        });
      console.log('Uploaded a blob or file!');
      
    });

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
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
        form={form}
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
          <Button onClick={props.closeFunc} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalForm;
