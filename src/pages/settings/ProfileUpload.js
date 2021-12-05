import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileUpload = () => {
    const props = {

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info[0]);
                console.log(info.file, info.fileList[0]);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const fileImage = (e)=>{
console.log(e)
    }


    return (
        <div>
            <input type='file' onChange={fileImage}/>

            <Upload name="logo" listType="picture" accept="image/*" multiple={false}
                maxCount={1} {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            {/* <Upload name="logo" listType="picture" accept="image/*" multiple={false}
                maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload> */}
            <Button icon={<UploadOutlined />}>Remove Photo</Button>
        </div>
    )
}

export default ProfileUpload
