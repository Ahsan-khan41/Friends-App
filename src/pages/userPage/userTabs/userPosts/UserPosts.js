import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import { Card } from "antd";
import { EditOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { collection, query, where, onSnapshot, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import { db } from '../../../../components/firebase';











const { Meta } = Card;

const UserPosts = (props) => {
    const [postArr, setPostArr] = useState([]);
    console.log(postArr,props.user);
    useEffect(() => {

        const q = query(collection(db, "posts"), where("adminUid", "==", `${props.user.uid}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((element) => {
                arr.push(element.data());
            });
            setPostArr(arr);
        });
    }, [props]);



    return (
        <div>
            <Row justify='center' gutter={[8, 8]}>
                {postArr.map((elem, index) => {
                    return (
                        <Col >
                            <Card key={index}
                                actions={[
                                    <LikeOutlined key="setting" />,
                                    <EditOutlined key="edit" />,

                                ]}
                                hoverable
                                style={{ width: 310, border: "1px solid #ccc", margin: '10px 20px' }}
                                cover={
                                    <img
                                        className="userImg"
                                        alt="example"
                                        src={elem.imgUrl}
                                    />
                                }
                            >
                                <p>Posted By : {elem.adminEmail}</p>
                                <Meta
                                    title={elem.postTitle}
                                    description={elem.postDescription}
                                />
                            </Card>
                        </Col>
                    );
                })}

            </Row>
        </div>
    )
}

export default UserPosts
