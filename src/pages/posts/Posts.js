import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Card } from "antd";
import PostModal from "./postModal/PostModal";
import { collection, onSnapshot, updateDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { EditOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';


import { db, storage } from "../../components/firebase";
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

    <div className="post-div">

      {/* <Nav /> */}


      {postArr.map((elem, index) => {
        return (

          <Card key={index}
            className="post-card"
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
