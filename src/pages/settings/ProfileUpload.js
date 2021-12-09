import React,{useContext} from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Form as AntForm } from 'antd';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';

const ProfileUpload = () => {
    const userObj = useContext(CurentUserContext)
    // let userObj = localStorage.getItem('user')
    // userObj = JSON.parse(userObj)
    // console.log(userObj)

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
        const storageRef = ref(storage);
        // Points to 'images'
        const imagesRef = ref(storageRef, 'images');
        // Note that you can use variables to create child values
        const fileName = userObj.uid;
        const spaceRef = ref(imagesRef, fileName);
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
