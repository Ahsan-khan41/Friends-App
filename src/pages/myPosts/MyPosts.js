import Nav from '../../components/Nav/Nav'
import React, { useEffect, useState,useContext } from "react";
import { Card } from "antd";
import { collection, query, where, onSnapshot, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { EditOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import CurentUserContext from '../../components/context/CurrentUserContext';


import { db, storage } from "../../components/firebase";
import { Row, Col } from 'antd';
import './posts.css'


const { Meta } = Card;

const MyPosts = () => {
    const userObj = useContext(CurentUserContext)
    const [postArr, setPostArr] = useState([]);
    //   console.log(postArr[0].adminUid);

    useEffect(() => {
        
        const q = query(collection(db, "posts"), where("adminUid", "==", `${userObj.uid}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((element) => {
                arr.push(element.data());
            });
            setPostArr(arr);
        });
    }, []);

    const likeHandler = (element) => {
        const post = doc(db, "posts", `${element.postUid}`);

        // Set the "capital" field of the city 'DC'
        updateDoc(post, {
            like: arrayUnion('aaaa')
        });
    }


    const confirm = (e) => {
        deleteDoc(doc(db, 'posts', `${e}`));
        const desertRef = ref(storage, `posts/${e}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log('File deleted successfully')
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
        });

    }



    return (
        <div>
            <Nav />
            <Row justify='center' gutter={[8, 8]}>
                {postArr.map((elem, index) => {
                    return (
                        <Col >
                            <Card key={index}
                                actions={[
                                    <LikeOutlined onClick={() => { likeHandler(elem) }} key="setting" />,
                                    <EditOutlined key="edit" />,
                                    // <DeleteOutlined key="delete" onConfirm={confirm} />,
                                    <Popconfirm
                                        title="Are you sure to delete this Post?"
                                        onConfirm={() => { confirm(elem.postUid) }}
                                        onVisibleChange={() => console.log('visible change')}
                                    >
                                        <DeleteOutlined key="delete" onConfirm={confirm} />
                                    </Popconfirm>,
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

export default MyPosts
