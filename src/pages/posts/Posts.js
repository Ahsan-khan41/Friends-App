import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Card } from "antd";
import PostModal from "./postModal/PostModal";
import { collection, onSnapshot, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import {  ref, deleteObject } from "firebase/storage";
import { EditOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import {  Popconfirm } from 'antd';


import { db,storage } from "../../components/firebase";
import { Row, Col } from 'antd';
import './posts.css'


const { Meta } = Card;

const Posts = () => {
  
  const [postArr, setPostArr] = useState([]);
  //   console.log(postArr[0].adminUid);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
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


  const confirm =  (e) => {
    deleteDoc(doc(db, 'posts', `${e}`));
    const desertRef = ref(storage, `posts/${e}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
      console.log('File deleted successfully')
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });
    console.log('resolved')

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


      <PostModal />
    </div>
  );
};

export default Posts;
