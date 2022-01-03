import React, { useEffect, useState, useContext } from "react";
import { Image, Button } from "antd";
import { useParams } from "react-router-dom";
import { UserAddOutlined } from '@ant-design/icons';

import "./userPage.css";
import { collection, query, where, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../components/firebase";
import Nav from "../../components/Nav/Nav";
import { Typography } from "antd";
import UserTabs from "./userTabs/UserTabs";
import CurentUserContext from "../../components/context/CurrentUserContext";

const { Title } = Typography;

const UserPage = () => {
  const userObj = useContext(CurentUserContext)
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

  const addFriendFunc = async () => {
    setDoc(doc(db, "users", `${userPeram.uid}`, "notifications", `${userObj.uid}`), {
      name: userObj.name,
      uid: userObj.uid,
      profile: userObj.profile,
      email: userObj.email,
      status: 'pending',
      recReqTime: serverTimestamp()
    });
    await setDoc(doc(db, "users", `${userPeram.uid}`, "recFriendReq", `${userObj.uid}`), {
      name: userObj.name,
      uid: userObj.uid,
      profile: userObj.profile,
      email: userObj.email,
      status: 'pending',
      recReqTime: serverTimestamp()
    });
    console.log(userPeram.uid);
  }

  return (
    <div>
      <Nav />

      <div className="parentDiv">
        <Image className="background-img" width={"100%"} src={userPeram.background} />
        <div id="background-img"></div>
        <div className="profile-div">
          <Image
            style={{ width: 100 }}
            // preview={false}
            className="profile-img"
            src={userPeram.profile}
          />
          <Title className="user-name" level={1}>
            {userPeram.name}
          </Title>
          <div className="addFriendBtn">
            <Button onClick={addFriendFunc} size='large' type="primary"><UserAddOutlined /> Add Friend</Button>
          </div>
        </div>

        <UserTabs user={userPeram} />
      </div>
    </div>
  );
};

export default UserPage;
