import React, { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import './settings.css'
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db,auth } from '../../components/firebase';
import {  signOut } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import CurentUserContext from '../../components/context/CurrentUserContext';
import ProfileUpload from './ProfileUpload';
import { Button } from 'antd';

const { Paragraph } = Typography;

const SettingCard = () => {
    let navigate = useNavigate();
    const userObj = useContext(CurentUserContext)
    let uName;
    let uEmail;
    const [name, setName] = useState(uName);
    const [email, setEmail] = useState(uEmail);
    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);

    const [imgURL, setImgURL] = useState('')
    useEffect(() => {
        onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                uName = doc.data().name
                uEmail = doc.data().email
                setUpdateName(uName)
                setUpdateEmail(uEmail)
                setName(doc.data().name)
                setEmail(doc.data().email)

            }
        });

    }, [userObj])

    useEffect(() => {
        getDownloadURL(ref(storage, userObj.uid))
            .then((url) => {
                const firestoreUser = doc(db, "users", `${userObj.uid}`);
                // Set the "users" field 
                updateDoc(firestoreUser, {
                    img: url
                });
                setImgURL(url)
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });

    }, [userObj])



    if (updateEmail) {

        const usersRef = doc(db, 'users', `${userObj.uid}`);
        setDoc(usersRef, { name: updateName, email: updateEmail }, { merge: true });
    }
    useEffect(() => {
        onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            setImgURL(doc.data().img)
        });
    }, [userObj])

    const logout = () => {
        signOut(auth).then(() => {
            setImgURL(imgURL)
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <div className='settingCardDiv'>

            <img className='settingUserPic' alt="example" src={imgURL} />
            <div style={{ width: '100%', marginTop: 10 }}>
                <ProfileUpload />
                <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                    Name  :<Paragraph editable={{ onChange: setUpdateName }}>{updateName}</Paragraph>
                </div>
                <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                    Email  : <Paragraph editable={{ onChange: setUpdateEmail }}>{updateEmail}</Paragraph>
                </div>
            </div>

            <Button danger onClick={logout}>Logout</Button>

        </div>
    )
}
export default SettingCard
