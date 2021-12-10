import React from 'react'
import { Image } from 'antd';
import { Row, Col } from 'antd';
import './newHome.css'
import { Typography } from 'antd';
const { Title } = Typography;

const NewHome = () => {
    return (
        <div>
            <div >
                {/* <Row>
                    <Col span={16} offset={4}> */}
                <Image className='background-img'
                    width={'100%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div className='profile-div'>
                    <Image preview={false} className='profile-img'
                        src="https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661"
                    />
                    <Title className='user-name' level={1}>Sufyan arain</Title>
                </div>
                {/* </Col>
                </Row> */}
            </div>
        </div>
    )
}

export default NewHome
