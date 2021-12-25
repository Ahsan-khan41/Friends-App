import React,{useContext,useState} from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Form as AntForm } from 'antd';
import {  ref, getDownloadURL,uploadBytes } from "firebase/storage";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db,storage } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';

const ProfileUpload = (props) => {
    console.log(props.pic);
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
   const pic = props.pic;

    const onFinish = (values) => {
        const file = values.upload[0].originFileObj;
        
        const storageRef1 = ref(storage,`user/${userObj.uid}/${pic}`);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef1, file).then((snapshot) => {
            
                getDownloadURL(ref(storage, `user/${userObj.uid}/${pic}`))
                    .then((url) => {
                        const firestoreUser = doc(db, "users", `${userObj.uid}`);
                        // Set the "users" field 
                        updateDoc(firestoreUser, {
                            [pic]: url
                        });
                        
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log(error)
                    });
        
            
        
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
                    label="Change :"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}

                >
                    <Upload name="logo" listType="picture" accept="image/*" multiple={false}
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </AntForm.Item>
                <AntForm.Item {...buttonItemLayout}>
                    <Button onClick={props.closeFunc} type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Submit</Button>


                </AntForm.Item>
            </AntForm>
        </div>
    )
}

export default ProfileUpload
