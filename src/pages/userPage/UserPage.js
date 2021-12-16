import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { useParams } from 'react-router-dom'

import './userPage.css'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../components/firebase';
import Nav from '../../components/Nav/Nav'
import { Typography } from 'antd';
import UserTabs from './userTabs/UserTabs';
const { Title } = Typography;

const UserPage = () => {
    let params = useParams();
    console.log(params)
    const [userPeram, setUserPeram] = useState(params)
    // console.log(userPeram);
    useEffect(() => {
        const q = query(collection(db, "users"), where("uid", "==", `${params.user}`));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserPeram(doc.data());
            });

        });
    }, [params])

    return (
        <div>
            <Nav />
            <div className='parentDiv'>
                {/* <Row>
                    <Col span={16} offset={4}> */}
                <Image className='background-img'
                    width={'100%'}
                    src={userPeram.img}
                />
                <div className='profile-div'>
                    <Image preview={false} className='profile-img'
                        src="https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661"
                    />
                    <Title className='user-name' level={1}>{userPeram.name}</Title>
                </div>
                {/* <Title className='emailHead' level={5}>Sufyan@gmail.com</Title> */}
                {/* <hr /> */}

                {/* </Col>
                </Row> */}
                <UserTabs user={userPeram} />
            </div>
        </div>
    )
}

export default UserPage
