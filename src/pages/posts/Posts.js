import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Card } from "antd";
import PostModal from "./postModal/PostModal";
import { collection, onSnapshot, updateDoc, doc,arrayUnion } from "firebase/firestore";
import { EditOutlined, LikeOutlined } from '@ant-design/icons';

import { db } from "../../components/firebase";
import { Row, Col } from 'antd';
import './posts.css'


const { Meta } = Card;

const Posts = () => {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);
  const [postArr, setPostArr] = useState([]);
  //   console.log(postArr[0].adminUid);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (doc) => {
      let arr = [];
      doc.forEach((element) => {
        console.log(element.data());
        arr.push(element.data());
      });
      setPostArr(arr);
    });
  }, []);

  const likeHandler = (element) => {
    console.log(element.postUid)
    const post = doc(db, "posts", `${element.postUid}`);

    // Set the "capital" field of the city 'DC'
    updateDoc(post, {
      like: arrayUnion('aaaa')
    });
  }

  return (

    <div>
      <Nav />

      <Row justify='center' gutter={[8, 8]}>
        {postArr.map((elem) => {
          return (
            <Col >
              <Card
                actions={[
                  <LikeOutlined onClick={() => { likeHandler(elem) }} key="setting" />,
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
                  description={ elem.postDescription}
                />
              </Card>
            </Col>
          );
        })}

      </Row>


      <PostModal />
    </div>
  );
};

export default Posts;
