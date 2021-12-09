import React, { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import './settings.css'
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../../components/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../components/firebase';
import CurentUserContext from '../../components/context/CurrentUserContext';
import ProfileUpload from './ProfileUpload';
const { Paragraph } = Typography;

const SettingCard = () => {
    const userObj = useContext(CurentUserContext)


    let uName;
    let uEmail;
    const [name, setName] = useState(uName);
    const [email, setEmail] = useState(uEmail);
    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);
    console.log(updateName, updateEmail)

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

                };
                xhr.open('GET', url);
                xhr.send();

                setImgURL(url)
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
                <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                    Name  :<Paragraph editable={{ onChange: setUpdateName }}>{updateName}</Paragraph>
                </div>
                <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                    Email  : <Paragraph editable={{ onChange: setUpdateEmail }}>{updateEmail}</Paragraph>
                </div>
            </div>

        </div>
    )
}
export default SettingCard
