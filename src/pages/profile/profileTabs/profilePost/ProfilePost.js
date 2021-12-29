import React, { useState, useEffect, useContext } from 'react'
import { Card, Badge,Divider,Input,Button,Avatar,Tooltip,Typography,Popconfirm } from "antd";
import moment from 'moment'
import { EditOutlined, LikeOutlined, DeleteOutlined, LikeFilled,CreditCardOutlined,VideoCameraAddOutlined } from '@ant-design/icons';
import { collection, query, where, onSnapshot, doc, arrayUnion, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import './profile-post.css'
import { db, storage } from '../../../../components/firebase';
import CurentUserContext from '../../../../components/context/CurrentUserContext';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;
const ProfilePost = () => {
    const userObj = useContext(CurentUserContext)

    const [postArr, setPostArr] = useState([]);
    useEffect(() => {

        const q = query(collection(db, "posts"), where("adminUid", "==", `${userObj.uid}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((element) => {
                arr.push(element.data());
            });
            setPostArr(arr);
        });
    }, [userObj]);

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

    const likeHandler = (element) => {
        const post = doc(db, "posts", `${element.postUid}`);

        // Set the "capital" field of the city 'DC'
        if ((element.like.findIndex((liked) => liked == userObj.uid)) >= 0) {
            updateDoc(post, {
                like: arrayRemove(userObj.uid)
            });
        } else {
            updateDoc(post, {
                like: arrayUnion(userObj.uid)
            });
        }
    }


    return (
        <div className='userPostParent'>
            <div className="create-post-div">
                <Input placeholder="What's on your mind ?" className="post-input" />
                <Divider />
                <div className="buttons-div">
                    <Button type="primary">
                        <CreditCardOutlined /> Photo
                    </Button>
                    <Button type="primary">
                        <VideoCameraAddOutlined /> Video
                    </Button>
                </div>
            </div>
            {postArr.map((elem, index) => {
                return (
                    <Card key={index}
                        className='post-card'
                        actions={[
                            <Badge count={elem.like.length}>
                                {/* {console.log((elem.like.findIndex((liked) => liked == userObj.uid)))} */}
                                {(() => {
                                    if ((elem.like.findIndex((liked) => liked == userObj.uid)) < 0) {
                                        return <LikeOutlined style={{ width: 32 }} onClick={() => { likeHandler(elem) }} key="setting" />
                                    } else {
                                        return <LikeFilled style={{ width: 32, color: '#1890ff' }} onClick={() => { likeHandler(elem) }} key="setting" />
                                    }
                                })()}
                            </Badge>,
                            <EditOutlined key="edit" />,
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
                                className="post-img"
                                alt="example"
                                src={elem.imgUrl}
                            />
                        }
                    >
                       <Link to={`/users/${elem.adminUid}`}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Avatar src={elem.adminProfile} size={37} />
                  <div style={{ marginLeft: 10 }}>
                    <Title style={{ margin: 0 }} level={5}>{elem.adminName}</Title>
                    <Tooltip title={moment(elem.timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
                      <span style={{ color: '#616161' }}>{moment(elem.timestamp.toDate()).fromNow()}</span>
                    </Tooltip>
                  </div>
                </div>
              </Link>
                        <Meta
                            title={elem.postTitle}
                            description={elem.postDescription}
                        />
                    </Card>
                );
            })}

        </div>
    )
}

export default ProfilePost
