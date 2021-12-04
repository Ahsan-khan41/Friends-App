import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;

const UserCard = (props) => {
    return (
        <div>
            <Card
                hoverable
                style={{ width: 310 }}
                cover={<img className='userImg' alt="example" src="https://www.parentmap.com/images/article/7877/BOY_feature_credit_will_austin_848x1200.jpg" />}
            >
                <Meta title={'Name : '+props.name} description={'Email : '+props.email} />
                <p>hello</p>
            </Card>
        </div>
    )
}

export default UserCard
