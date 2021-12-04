import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from 'antd';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import './settings.css'
import { doc, onSnapshot, setDoc } from "firebase/firestore";

import { db } from '../../components/firebase';
import ProfileUpload from './ProfileUpload';
const { Paragraph } = Typography;
const SettingCard = () => {
    let userObj = localStorage.getItem('user')
    userObj = JSON.parse(userObj)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);
    console.log(name, email)
    console.log(updateName, updateEmail)


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", `${userObj.uid}`), (doc) => {
            if (doc.data()) {
                setName(doc.data().name)
                setEmail(doc.data().email)
                console.log("Current data: ", doc.data())

            }
        });

    }, [])

    // setName(updateName)
    // setEmail(updateEmail)
    const memoizedValue = useMemo(() => {
        const usersRef = doc(db, 'users', `${userObj.uid}`);
        setDoc(usersRef, { name: updateName, email: updateEmail }, { merge: true });
        console.log('usememmo')
    }, [setUpdateName, setUpdateEmail, Paragraph]);
    // const memoizedCallback = useCallback(
    //     () => {

    //     },
    //     [setUpdateName, setUpdateEmail, Paragraph],
    // );
    return (
        <div className='settingCardDiv'>

            <img className='settingUserPic' alt="example" src="https://www.parentmap.com/images/article/7877/BOY_feature_credit_will_austin_848x1200.jpg" />
            <div style={{ width: '100%', marginTop: 10 }}>
                <ProfileUpload />
                <Paragraph editable={{ onChange: setUpdateName }}>{updateName}</Paragraph>
                <Paragraph editable={{ onChange: setUpdateEmail }}>{updateEmail}</Paragraph>
            </div>

        </div>
    )
}
export default SettingCard
