import React, { useEffect } from 'react'
import { Image } from 'antd';
import { useParams } from 'react-router-dom'

import './newHome.css'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../components/firebase';
import Nav from '../../../components/Nav/Nav'
import { Typography } from 'antd';
const { Title } = Typography;

const NewHome = () => {
    let params = useParams();
    console.log(params)

    useEffect(() => {
        const q = query(collection(db, "users"), where("name", "==", `${params.user}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());
            });
            console.log("Current cities in CA: ", cities);
        });
    }, [])

    return (
        <div>
            <Nav />
            <div className='parentDiv'>
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
                <Title className='user-name' level={5}>Sufyan@gmail.com</Title>
                <hr />
                {/* </Col>
                </Row> */}
            </div>
        </div>
    )
}

export default NewHome
