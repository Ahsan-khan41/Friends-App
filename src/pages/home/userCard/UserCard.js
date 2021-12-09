import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const UserCard = (props) => {

    return (
        <div>
            <Card
                hoverable
                style={{ width: 310, border: '1px solid #ccc' }}
                cover={<img className='userImg' alt="example" src={props.img} />}>
                <Meta title={'Name : ' + props.name} description={'Email : ' + props.email} />
                <p>hello</p>
            </Card>
        </div>
    )
}

export default UserCard
