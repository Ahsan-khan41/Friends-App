import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from 'antd';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import './settings.css'
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../../components/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../components/firebase';

import ProfileUpload from './ProfileUpload';
const { Paragraph } = Typography;

const SettingCard = () => {
    let userObj = localStorage.getItem('user')
    userObj = JSON.parse(userObj)

    let uName;
    let uEmail;
    const [name, setName] = useState(uName);
    const [email, setEmail] = useState(uEmail);
    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);
    console.log(name, email)
    console.log(uName, uEmail)
    console.log(updateName, updateEmail)

    const [imgURL, setImgURL] = useState('')
    console.log(imgURL)
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                uName = doc.data().name
                uEmail = doc.data().email
                setUpdateName(uName)
                setUpdateEmail(uEmail)
                setName(doc.data().name)
                setEmail(doc.data().email)
                console.log("Current data: ", doc.data())

            }
        });

    }, [])

    useEffect(() => {
        getDownloadURL(ref(storage, userObj.uid))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                // const img = document.getElementById('myimg');
                // img.setAttribute('src', url);
                setImgURL(url)
                console.log(url)
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });

    }, [])



    if (updateEmail) {

        console.log('effects')
        const usersRef = doc(db, 'users', `${userObj.uid}`);
        setDoc(usersRef, { name: updateName, email: updateEmail }, { merge: true });
        console.log('usememmonpm ')
    }


    return (
        <div className='settingCardDiv'>

            <img className='settingUserPic' alt="example" src={imgURL} />
            <div style={{ width: '100%', marginTop: 10 }}>
                <ProfileUpload />
                <Paragraph editable={{ onChange: setUpdateName }}>{updateName}</Paragraph>
                <Paragraph editable={{ onChange: setUpdateEmail }}>{updateEmail}</Paragraph>
            </div>

        </div>
    )
}
export default SettingCard
