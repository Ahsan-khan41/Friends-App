import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { useParams } from "react-router-dom";

import "./userPage.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../components/firebase";
import Nav from "../../components/Nav/Nav";

import { Typography } from "antd";
import UserTabs from "./userTabs/UserTabs";
const { Title } = Typography;

const UserPage = () => {
  let params = useParams();
  console.log(params);
  const [userPeram, setUserPeram] = useState(params);
  // console.log(userPeram);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", `${params.user}`)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserPeram(doc.data());
      });
    });
  }, [params]);

  return (
    <div>
      <Nav />
      <div className="parentDiv">
        <Image className="background-img" width={"100%"} src={userPeram.img} />
        <div id="background-img"></div>
        <div className="profile-div">
          <Image
          style={{width:100}}
            preview={false}
            className="profile-img"
            src="https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661"
          />
          <Title className="user-name" level={2}>
            {userPeram.name}
          </Title>
        </div>

        <UserTabs user={userPeram} />
      </div>
    </div>
  );
};

export default UserPage;
