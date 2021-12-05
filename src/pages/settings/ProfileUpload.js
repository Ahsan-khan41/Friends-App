import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Form as AntForm, Input, } from 'antd';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../components/firebase';

const ProfileUpload = () => {
    let userObj = localStorage.getItem('user')
    userObj = JSON.parse(userObj)

    const [form] = AntForm.useForm();
    // console.log('Success:', values.upload.file, values.upload.file.name);

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
    };

    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 4 },
    };

    const onFinish = (values) => {
        const file = values.upload[0].originFileObj;
        console.log(file)
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     const base64 = e.target.result;
        //     form.resetFields();
        // };
        // reader.readAsDataURL(file.originFileObj);


        // Points to the root reference
        const storageRef = ref(storage);

        // Points to 'images'
        const imagesRef = ref(storageRef, 'images');

        // Points to 'images/space.jpg'
        // Note that you can use variables to create child values
        const fileName = userObj.uid;
        const spaceRef = ref(imagesRef, fileName);

        // File path is 'images/space.jpg'
        const path = spaceRef.fullPath;

        // File name is 'space.jpg'
        const name = spaceRef.name;

        // Points to 'images'
        const imagesRefAgain = spaceRef.parent;
        console.log(imagesRefAgain)

        const storageRef1 = ref(storage, userObj.uid);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef1, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            onReset()
        });


    };

    const onReset = () => {
        form.resetFields();
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };






    return (
        <div>

            <AntForm
                {...formItemLayout}
                layout="horizontal"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <AntForm.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    
                >
                    <Upload name="logo" listType="picture" accept="image/*" multiple={false}
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </AntForm.Item>
                <AntForm.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Submit</Button>


                </AntForm.Item>
            </AntForm>
        </div>
    )
}

export default ProfileUpload
