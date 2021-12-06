import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Card } from "antd";
import PostModal from "./postModal/PostModal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../components/firebase";

const { Meta } = Card;

const Posts = () => {
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

  return (
    <div>
      <Nav />
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {postArr.map((elem) => {
          return (
            <Card
              hoverable
              style={{ width: 310, border: "1px solid #ccc" }}
              cover={
                <img
                  className="userImg"
                  alt="example"
                  src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              }
            >
              <Meta
                title={"Name : " + elem.postTitle}
                description={"Email : " + elem.postDescription}
              />
              <p>hello</p>
            </Card>
          );
        })}
      </div>

      <PostModal />
    </div>
  );
};

export default Posts;
