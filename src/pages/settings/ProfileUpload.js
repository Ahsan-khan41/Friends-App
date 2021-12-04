import React from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileUpload = () => {
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        multiple: false,
        beforeUpload(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        ctx.fillStyle = 'blue';
                        ctx.textBaseline = 'middle';
                        ctx.font = '33px Arial';
                        ctx.fillText('Ant Design', 20, 20);
                        canvas.toBlob(resolve);
                    };
                };
            });
        },
    };

    return (
        <div>
            <Upload  listType="picture"
                accept="image/*"
                multiple={false}
                maxCount={1} maxCount={1} {...props}>
                <Button icon={<UploadOutlined />}>Change Photo</Button>
            </Upload>
                <Button icon={<UploadOutlined />}>Remove Photo</Button>
        </div>
    )
}

export default ProfileUpload
