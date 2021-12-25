import React, { useEffect, useState, useContext } from "react";
import { Image } from "antd";
import ProfileUpload from "./ProfileUpload";
import { CameraOutlined } from '@ant-design/icons';
import "../userPage/userPage.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../components/firebase";
import Nav from "../../components/Nav/Nav";
import { Typography } from "antd";
// import UserTabs from "../userPage/userTabs/UserTabs";
import ProfileTabs from './profileTabs/ProfileTabs'
import CurentUserContext from "../../components/context/CurrentUserContext";
import { Modal, Button, Avatar, Popover } from 'antd';
import { signOut } from "firebase/auth";
import { auth } from "../../components/firebase";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Profile = () => {
    let navigate = useNavigate();
    const [avatar, setAvatar] = useState(false)
    const hide = () => {
        signOut(auth).then(() => {
            navigate("/");
            window.location.reload(true);
        }).catch((error) => {
            // An error happened.
        });
        setAvatar(false)
    };
    const handleVisibleChange = visible => {
        setAvatar(visible)
    };
    //modal code
    const [visiblep, setVisiblep] = useState(false)
    const [visibleb, setVisibleb] = useState(false)
    const showModal = () => {
        setVisibleb(true)
    };
    const showModalp = () => {
        setVisiblep(true)
    };
    const handleCancel = () => {
        setVisiblep(false);
        setVisibleb
            (false);
    };
    //modal code

    const userObj = useContext(CurentUserContext);
    const [userProfile, setUserProfile] = useState({})

    // console.log(userPeram);
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
    }, [userObj]);
    return (
        <div>
            <Nav />
            <div className="parentDiv">
                <Image className="background-img" width={"100%"} src={userProfile.background} />
                {/* Modal */}
                <div style={{ position: "absolute", right: 20, bottom: 70 }}>
                    <Button style={{ height: 45, borderRadius: 10 }} onClick={showModal}><CameraOutlined /> Edit Cover Photo</Button>
                    <Modal
                        style={{ textAlign: 'center' }}
                        visible={visibleb}
                        title="Select Background"
                        onCancel={handleCancel}
                        footer={[]}
                    >
                        <ProfileUpload pic={'background'} closeFunc={handleCancel} />
                    </Modal>
                </div>
                {/* end modal */}

                <div className="profile-div">

                    <Image
                        style={{ width: 100 }}
                        // preview={false}
                        className="profile-img"
                        src={userProfile.profile}
                    />
                    {/* Modal */}
                    <div style={{ position: "relative", left: -60, top: 137 }}>
                        <Button style={{ height: 48, width: 48, borderRadius: '50%' }} onClick={showModalp}><CameraOutlined /> </Button>
                        <Modal
                            style={{ textAlign: 'center' }}
                            visible={visiblep}
                            title="Select Profile"
                            onCancel={handleCancel}
                            footer={[]}
                        >
                            <ProfileUpload pic={'profile'} closeFunc={handleCancel} />
                        </Modal>
                    </div>
                    {/* end modal */}
                    <Title className="user-name" level={2}>
                        {userProfile.name}
                    </Title>
                </div>
                <ProfileTabs user={userProfile} />
            </div>
            <div style={{ position: 'fixed', bottom: 20, right: 20, cursor: 'pointer', border: '4px solid #ccc', borderRadius: '50%' }}>
                <Popover
                    content={<a onClick={hide}>Logout</a>}
                    trigger="click"
                    visible={avatar}
                    onVisibleChange={handleVisibleChange}
                >
                    <Avatar src={userProfile.profile} size={64} />
                </Popover>
            </div>
        </div>
    );
}

export default Profile
