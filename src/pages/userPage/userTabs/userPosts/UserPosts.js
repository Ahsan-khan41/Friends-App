import React, { useState, useEffect,useContext } from 'react'
import { Row, Col } from 'antd';
import { Card,Badge } from "antd";
import { EditOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { collection, query, where, onSnapshot, doc, arrayUnion, deleteDoc ,updateDoc} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import './user-post.css'
import { Popconfirm } from 'antd';
import { db, storage } from '../../../../components/firebase';
import CurentUserContext from '../../../../components/context/CurrentUserContext';

const { Meta } = Card;

const UserPosts = (props) => {
  const userObj = useContext(CurentUserContext)

    const [postArr, setPostArr] = useState([]);
    console.log(postArr, props.user);
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
        updateDoc(post, {
            like: arrayUnion(userObj.uid)
        });
    }


    return (
        <div className='userPostParent'>
            {postArr.map((elem, index) => {
                return (
                    <Card key={index}
                        className='post-card'
                        actions={[
                            <Badge count={elem.like.length}>
                                <LikeOutlined style={{ width: 32 }} onClick={() => { likeHandler(elem) }} key="setting" />
                            </Badge>,
                            <EditOutlined key="edit" />,
                            <ShareAltOutlined />

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
                        <p>Posted By : {elem.adminEmail}</p>
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

export default UserPosts
