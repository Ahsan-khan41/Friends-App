import React, { useEffect, useState,useContext } from "react";
import { Image } from "antd";

import "../userPage/userPage.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../components/firebase";
import Nav from "../../components/Nav/Nav";
import { Typography } from "antd";
import UserTabs from "../userPage/userTabs/UserTabs";
import CurentUserContext from "../../components/context/CurrentUserContext";
const { Title } = Typography;


const Profile = () => {
    const userObj = useContext(CurentUserContext);
    const [userProfile,setUserProfile] = useState({})

    // console.log(userPeram);
    let userP = {}
    useEffect(() => {
        const q = query(
            collection(db, "users"),
            where("uid", "==", `${userObj.uid}`)
        );
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserProfile(doc.data())
            });
        });
    }, []);
console.log(userP);
    return (
        <div>
            <Nav />
            <div className="parentDiv">
                <Image className="background-img" width={"100%"} src={userProfile.img} />
                <div className="profile-div">
                    <Image
                        style={{ width: 100 }}
                        preview={false}
                        className="profile-img"
                        src="https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661"
                    />
                <Title className="user-name" level={2}>
                    {userProfile.name}
                </Title>
                </div>
                <UserTabs user={userProfile} />

            </div>
        </div>
    );
}

export default Profile
