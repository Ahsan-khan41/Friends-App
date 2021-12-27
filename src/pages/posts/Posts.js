import React, { useEffect, useState, useContext } from "react";
import { Card } from "antd";
import PostModal from "./postModal/PostModal";
import { collection, onSnapshot, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { EditOutlined, LikeOutlined, ShareAltOutlined, LikeFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { Avatar, Badge } from 'antd';
import CurentUserContext from "../../components/context/CurrentUserContext";

import { db, storage } from "../../components/firebase";
import { Row, Col } from 'antd';
import './posts.css'


const { Meta } = Card;

const Posts = () => {
  const userObj = useContext(CurentUserContext)

  const [postArr, setPostArr] = useState([]);
  //   console.log(postArr[0].adminUid);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
      let arr = [];
      doc.forEach((element) => {
        arr.push(element.data());
      });
      setPostArr(arr);
    });
  }, []);

  const likeHandler = (element) => {
    const post = doc(db, "posts", `${element.postUid}`);
    console.log(post);

    // Set the "capital" field of the city 'DC'
    if ((element.like.findIndex((liked) => liked == userObj.uid)) > 0) {
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
    <div className="post-div">



      {postArr.map((elem, index) => {
        return (

          <Card key={index}
            className="post-card"
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
              // <DeleteOutlined key="delete" onConfirm={confirm} />,
              <ShareAltOutlined />

            ]}
            hoverable
            style={{ border: "1px solid #ccc", margin: '10px 20px' }}
            cover={
              <img
                className="post-img"
                alt="example"
                src={elem.imgUrl}
              />
            }
          >
            <h4>Posted By : {elem.adminEmail}</h4>
            <p></p>
            <Meta
              title={elem.postTitle}
              description={elem.postDescription}
            />
          </Card>

        );
      })}




      <PostModal />
    </div>
  );
};

export default Posts;